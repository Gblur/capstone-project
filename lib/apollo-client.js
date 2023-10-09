import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { getOperationAST } from "graphql";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { WebSocket } from "ws";

const bearer =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2JsdXIiLCJlbWFpbCI6ImZsb3JpYW5nYWVibGVyODdAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8yNTU4Njc5NT92PTQiLCJzdWIiOiJiZjA2YTFiMi1mZGVjLTRhMGUtOTVlOC0wYTAxMDBmOGFkZjYiLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiYmYwNmExYjItZmRlYy00YTBlLTk1ZTgtMGEwMTAwZjhhZGY2In0sImlhdCI6MTY5Njg0ODkyMX0.xQ8s14mQVrnRBQwBBCIx6BXHfKld-3KTlNym1pkce4o";
// Create an HTTP link for normal queries and mutations
const httpLink = new HttpLink({
  uri: `http://${process.env.NEXT_PUBLIC_URL_SERVER_GRAPHQL}/graphql`,
  credentials: "same-origin",
  headers: {
    authorization: `Bearer ${bearer}`,
  },
});

// Create a WebSocket link for subscriptions
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: `ws://${process.env.NEXT_PUBLIC_URL_SERVER_GRAPHQL}/graphql`, // WebSocket endpoint (your server's WebSocket URL)
          options: {
            timeout: 10000,
          },
          connectionParams: {
            headers: {
              authorization: `Bearer ${bearer}`,
            },
          },
          credentials: "same-origin",
        })
      )
    : null;

// Create a split link that routes subscriptions through WebSocket and other queries/mutations through HTTP
const splitLink =
  typeof window !== "undefined" && wsLink != null
    ? split(({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
      }, httpLink)
    : httpLink;

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
