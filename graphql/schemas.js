import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    maps: [Map]
    searchMaps(value: String): [Map]
  }

  input Post {
    team: String!
    description: String!
    name: String!
    mapType: String!
  }

  type Mutation {
    postMap(input: Post!): Map
  }

  type Map {
    id: ID
    team: String
    description: String
    name: String
    mapType: String
  }
`;

export default typeDefs;
