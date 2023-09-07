import gql from "graphql-tag";

const typeDefs = gql`
  scalar DateTime
  type Query {
    maps: [Map]
    orderByName(orderBy: SortByName): [Map]
    mapById(id: ID!): Map
  }

  enum Sort {
    asc
    desc
  }

  input SortByName {
    name: Sort
  }

  input UpdateById {
    id: ID!
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
    date: DateTime!
    nodes: String
    edges: String
    description: String
    name: String
    mapType: String
  }
`;

export default typeDefs;
