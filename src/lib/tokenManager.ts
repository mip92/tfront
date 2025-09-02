import { client } from "./graphql";
import { RefreshTokenDocument } from "@/generated/graphql";

interface QueuedRequest {
  resolve: (value: any) => void;
  reject: (error: any) => void;
  operation: any;
  forward: any;
}

class TokenManager {
  private isRefreshing = false;
  private failedQueue: QueuedRequest[] = [];
  private refreshPromise: Promise<string> | null = null;

  private addToQueue(resolve: any, reject: any, operation: any, forward: any) {
    this.failedQueue.push({ resolve, reject, operation, forward });
  }

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject, operation, forward }) => {
      if (error) {
        reject(error);
      } else {
        operation.setContext({
          headers: {
            ...operation.getContext().headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        });
        const observable = forward(operation);
        resolve(observable);
      }
    });

    this.failedQueue = [];
  }
  private async refreshAccessToken(): Promise<string> {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const { data } = await client.mutate({
        mutation: RefreshTokenDocument,
        variables: {
          input: {
            refreshToken: refreshToken,
          },
        },
        fetchPolicy: "no-cache",
      });

      if (!data?.refreshToken?.access_token) {
        throw new Error("No access token in refresh response");
      }

      localStorage.setItem("accessToken", data.refreshToken.access_token);
      if (data.refreshToken.refresh_token) {
        localStorage.setItem("refreshToken", data.refreshToken.refresh_token);
      }

      return data.refreshToken.access_token;
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      throw error;
    }
  }

  handle401Error(operation: any, forward: any): any {
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
      this.refreshPromise!.then((newToken) => {
        operation.setContext({
          headers: {
            ...operation.getContext().headers,
            authorization: `Bearer ${newToken}`,
          },
        });

        this.processQueue(null, newToken);
        const observable = forward(operation);
        resolve(observable);
      })
        .catch((error) => {
          this.processQueue(error, null);
          reject(error);
        })
        .finally(() => {
          this.isRefreshing = false;
          this.refreshPromise = null;
        });
    });
  }

  is401Error(error: any): boolean {
    return (
      error?.networkError?.statusCode === 401 ||
      error?.graphQLErrors?.some(
        (e: any) => e.extensions?.code === "UNAUTHENTICATED"
      ) ||
      error?.message?.includes("401") ||
      error?.message?.includes("Unauthorized")
    );
  }
}

export const tokenManager = new TokenManager();
