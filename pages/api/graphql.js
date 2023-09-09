import { createYoga, createSchema, createPubSub, PubSub } from "graphql-yoga";

import typeDefs from "../../graphql/schemas";
import { prisma, resolvers, pubsub } from "../../graphql/resolvers";

const schema = new createSchema({
  typeDefs,
  resolvers,
});

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga({
  schema,
  context: { prisma, pubsub },
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
