import { createYoga, createSchema } from "graphql-yoga";

import typeDefs from "../../graphql/schemas";
import resolvers from "../../graphql/resolvers";
import allowCors from "../../utils/cors";

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
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
