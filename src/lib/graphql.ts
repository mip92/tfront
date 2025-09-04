import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  FetchResult,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { Observable } from "@apollo/client/utilities";
import { tokenManager } from "./tokenManager";

// GraphQL endpoint
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql",
});

// Auth link to add token to headers
const authLink = setContext((_, { headers }) => {
  let accessToken = null;
  let refreshToken = null;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
    refreshToken = localStorage.getItem("refreshToken");
  }
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
      "x-refresh-token": refreshToken || "",
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (
      tokenManager.is401Error({
        graphQLErrors: graphQLErrors as unknown[],
        networkError: networkError as { statusCode?: number },
      })
    ) {
      return new Observable((observer) => {
        tokenManager
          .handle401Error(operation, forward)
          .then((observable) => {
            observable.subscribe({
              next: (value) => observer.next(value as FetchResult),
              error: (error) => observer.error(error),
              complete: () => observer.complete(),
            });
          })
          .catch((error) => {
            observer.error(error);
          });
      });
    }
  }
);

export const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          productsWithPagination: {
            keyArgs: ["query", ["search"]],
            merge: createPaginationMergeFunction(),
          },
          brandsWithPagination: {
            keyArgs: ["query", ["search"]],
            merge: createPaginationMergeFunction(),
          },
          boxTypesWithPagination: {
            keyArgs: ["query", ["search"]],
            merge: createPaginationMergeFunction(),
          },
        },
      },
    },
  }),
  ssrMode: typeof window === "undefined",
});

interface PaginationData {
  rows: unknown[];
  total: number;
}

function createPaginationMergeFunction() {
  return (
    existing: PaginationData = { rows: [], total: 0 },
    incoming: PaginationData
  ) => {
    if (incoming.rows.length > 0 && existing.rows.length === 0) {
      return incoming;
    }

    if (existing.rows.length >= incoming.total) {
      return existing;
    }

    return {
      total: incoming.total,
      rows: [...existing.rows, ...incoming.rows],
    };
  };
}

// Auth types
export interface User {
  id: string;
  email: string;
  username?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  username?: string;
}
