import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    maps: [Map]
    searchMaps(value: String): [Map]
  }

  type Map {
    id: ID
    team: String
    description: String
    date: String
    nodes: String
    edges: String
    name: String
    mapType: String
  }
`;

export default typeDefs;
