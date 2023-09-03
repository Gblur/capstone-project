import { Prisma, PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { GraphQLScalarType } from "graphql";

// Prisma Client
const prisma = new PrismaClient();

// DateResolver
const options = { day: "numeric", month: "long", year: "numeric" };
const dateResolver = new GraphQLScalarType({
  name: "DateTime",
  parseValue() {},
  serialize(value) {
    return value.toLocaleDateString("de-DE", options);
  },
});

// Zod FormInput Schema
const formInputSchema = z.object({
  name: z.string().max(10),
  mapType: z.string(),
  team: z.string(),
  description: z.string(),
});

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

const resolvers = {
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
      const formInput = formInputSchema.parse(input);
      try {
        const newPost = prisma.map.create({
          data: {
            ...formInput,
            nodes: JSON.stringify(
              initialNodes(input.mapType === "Repos" ? "Repos" : "Root")
            ),
            edges: JSON.stringify(initialEdge),
          },
        });
        return newPost;
      } catch (error) {
        console.error("Failed to create Post");
      }
    },
  },
};

export default resolvers;
