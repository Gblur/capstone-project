import { createYoga, createSchema } from "graphql-yoga";

import typeDefs from "../../graphql/schemas";
import resolvers from "../../graphql/resolvers";
import allowCors from "../../utils/cors";
import { GraphQLScalarType } from "graphql";

const options = { day: "numeric", month: "long", year: "numeric" };
const dateResolver = new GraphQLScalarType({
  name: "DateTime",
  parseValue() {},
  serialize(value) {
    return value.toLocaleDateString("de-DE", options);
  },
});

const schema = new createSchema({
  typeDefs,
  resolvers: {
    ...resolvers,
    DateTime: dateResolver,
  },
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
