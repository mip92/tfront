import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// GraphQL endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
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

// Apollo Client
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined", // Enable SSR mode on server
});

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
