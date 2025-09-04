import { client } from './graphql';
import { RefreshTokenDocument } from '@/generated/graphql';
import { Operation, NextLink } from '@apollo/client';
import { Observable } from '@apollo/client/utilities';

interface QueuedRequest {
  resolve: (value: Observable<unknown>) => void;
  reject: (error: Error) => void;
  operation: Operation;
  forward: NextLink;
}

class TokenManager {
  private isRefreshing = false;
  private failedQueue: QueuedRequest[] = [];
  private refreshPromise: Promise<string> | null = null;

  private addToQueue(
    resolve: (value: Observable<unknown>) => void,
    reject: (error: Error) => void,
    operation: Operation,
    forward: NextLink
  ) {
    this.failedQueue.push({ resolve, reject, operation, forward });
  }

  private processQueue(error: Error | null, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject, operation, forward }) => {
      if (error) {
        reject(error);
      } else {
        const refreshToken = localStorage.getItem('refreshToken');
        const oldHeaders = operation.getContext().headers || {};

        // Update the operation context with new tokens
        operation.setContext({
          headers: {
            ...oldHeaders,
            authorization: token ? `Bearer ${token}` : '',
            'x-refresh-token': refreshToken || '',
          },
        });

        const observable = forward(operation);
        resolve(observable);
      }
    });

    this.failedQueue = [];
  }
  private async refreshAccessToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const { data } = await client.mutate({
        mutation: RefreshTokenDocument,
        context: {
          headers: {
            'x-refresh-token': refreshToken,
          },
        },
        fetchPolicy: 'no-cache',
      });

      if (!data?.refreshToken?.access_token) {
        throw new Error('No access token in refresh response');
      }

      localStorage.setItem('accessToken', data.refreshToken.access_token);
      if (data.refreshToken.refresh_token) {
        localStorage.setItem('refreshToken', data.refreshToken.refresh_token);
      }

      return data.refreshToken.access_token;
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      throw error;
    }
  }

  handle401Error(
    operation: Operation,
    forward: NextLink
  ): Promise<Observable<unknown>> {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.addToQueue(resolve, reject, operation, forward);
      });
    }

    this.isRefreshing = true;

    if (!this.refreshPromise) {
      this.refreshPromise = this.refreshAccessToken();
    }

    return new Promise((resolve, reject) => {
      this.refreshPromise!.then(newToken => {
        const newRefreshToken = localStorage.getItem('refreshToken');

        // Update the operation context with new tokens
        const oldHeaders = operation.getContext().headers || {};
        operation.setContext({
          headers: {
            ...oldHeaders,
            authorization: `Bearer ${newToken}`,
            'x-refresh-token': newRefreshToken || '',
          },
        });

        this.processQueue(null, newToken);

        // Use the original operation with updated context, don't create a new one
        const observable = forward(operation);
        resolve(observable);
      })
        .catch(error => {
          this.processQueue(error, null);
          reject(error);
        })
        .finally(() => {
          this.isRefreshing = false;
          this.refreshPromise = null;
        });
    });
  }

  is401Error(error: {
    graphQLErrors?: unknown[];
    networkError?: { statusCode?: number };
    message?: string;
  }): boolean {
    return (
      error?.networkError?.statusCode === 401 ||
      (error?.graphQLErrors?.some(
        (e: unknown) =>
          (e as { extensions?: { code?: string } })?.extensions?.code ===
          'UNAUTHENTICATED'
      ) ??
        false) ||
      (error?.message?.includes('401') ?? false) ||
      (error?.message?.includes('Unauthorized') ?? false)
    );
  }
}

export const tokenManager = new TokenManager();
