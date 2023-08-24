import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
          data: { ...input, nodes: "[]", edges: "[]" },
        });
        return newPost;
      } catch (error) {
        console.error("Failed to create Post");
      }
    },
  },
};

export default resolvers;
