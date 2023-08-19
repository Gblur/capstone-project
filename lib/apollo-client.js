import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: `http://localhost:3000/api/graphql`,
  credentials: "include",
});

const client = new ApolloClient({
  httpLink,
  cache: new InMemoryCache(),
});

export default client;
