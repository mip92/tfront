import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
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
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken");
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (tokenManager.is401Error({ graphQLErrors, networkError })) {
      return new Observable((observer: any) => {
        tokenManager
          .handle401Error(operation, forward)
          .then((observable: any) => {
            observable.subscribe({
              next: (value: any) => observer.next(value),
              error: (error: any) => observer.error(error),
              complete: () => observer.complete(),
            });
          })
          .catch((error: any) => {
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
            merge: createPaginationMergeFunction("products"),
          },
          brandsWithPagination: {
            keyArgs: ["query", ["search"]],
            merge: createPaginationMergeFunction("brands"),
          },
          boxTypesWithPagination: {
            keyArgs: ["query", ["search"]],
            merge: createPaginationMergeFunction("box types"),
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

function createPaginationMergeFunction(type: string) {
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
