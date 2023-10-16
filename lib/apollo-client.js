import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { getOperationAST } from "graphql";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { WebSocket } from "ws";

// Create an HTTP link for normal queries and mutations
const httpLink = new HttpLink({
  uri: `http://${process.env.NEXT_PUBLIC_URL_APOLLO_GRAPHQL}/graphql`, // Your GraphQL server endpoint
});

// Create a WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${process.env.NEXT_PUBLIC_URL_APOLLO_GRAPHQL}/subscriptions`, // WebSocket endpoint (your server's WebSocket URL)
    options: {
      reconnect: true,
      timeout: 10000,
    },
    webSocketImpl: WebSocket,
  })
);

// Create a split link that routes subscriptions through WebSocket and other queries/mutations through HTTP
const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
