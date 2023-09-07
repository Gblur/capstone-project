import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";

const client = new ApolloClient({
  uri: `/api/graphql`,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});

export default client;
