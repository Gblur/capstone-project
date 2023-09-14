import { createYoga, createSchema } from "graphql-yoga";

import typeDefs from "../../graphql/schemas";
import { prisma, resolvers, pubSub } from "../../graphql/resolvers";

const schema = createSchema({
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
  context: { prisma, pubSub },
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
