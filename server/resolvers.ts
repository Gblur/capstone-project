import prisma from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { GraphQLScalarType } from "graphql";
import { createPubSub } from "graphql-yoga";

// Prisma Client
export const pubSub = createPubSub();

// DateResolver
const options = { day: "numeric", month: "long", year: "numeric" };
const dateResolver = new GraphQLScalarType({
  name: "DateTime",
  parseValue() {},
  serialize(value: any) {
    return value.toLocaleDateString("de-DE", options);
  },
});

// Zod FormInput Schema

// static variables for Nodes and Edges
const initialNodes = (label) => [
  {
    id: uuidv4(),
    type: "parent",
    data: {
      label: label,
      background: "var(--color-node-parent-bg)",
      type: "root",
      status: "unknown",
    },
    position: { x: 250, y: 25 },
  },
];
const initialEdge = [];

export const resolvers = {
  DateTime: dateResolver,
  Query: {
    maps: async () => {
      try {
        return await prisma.map.findMany();
      } catch (error) {
        console.error("Failed to fetch", error);
      }
    },
    orderByName: async (_, { orderBy }) => {
      return await prisma.map.findMany({
        orderBy: [
          {
            name: orderBy.name,
          },
        ],
      });
    },
    mapById: async (_, { id }) => {
      try {
        return await prisma.map.findUnique({
          where: { id },
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  Mutation: {
    postMap: (_, { input }) => {
      // const formInput = formInputSchema.parse(input);
      try {
        const newPost = prisma.map.create({
          data: {
            ...input,
            nodes: JSON.stringify(
              initialNodes(input.mapType === "Repos" ? "Repos" : "Root")
            ),
            edges: JSON.stringify(initialEdge),
          },
        });
        pubSub.publish("POST_CREATED", input);
        return newPost;
      } catch (error) {
        console.error("Failed to create Post");
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, { input }) => {
        return pubSub.subscribe("POST_CREATED");
      },
      resolve: (payload) => {
        return payload;
      },
    },
  },
};
