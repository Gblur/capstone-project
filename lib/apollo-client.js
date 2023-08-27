import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: `http://localhost:3000/api/graphql`,
});

const client = new ApolloClient({
  uri: `/api/graphql`,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});

export default client;
