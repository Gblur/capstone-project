import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "graphql/**/*.gql",
  generates: {
    "graphql/ops/": {
      preset: "client",
      plugins: ["typescript-resolvers"],
    },
  },
};

export default config;