import { Prisma, PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

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
  Query: {
    maps: async () => {
      try {
        return await prisma.map.findMany();
      } catch (error) {
        console.error("Failed to fetch", error);
      }
    },
  },
  Mutation: {
    postMap: (_, { input }) => {
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
        return newPost;
      } catch (error) {
        console.error("Failed to create Post");
      }
    },
  },
};

export default resolvers;
