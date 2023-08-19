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
};

export default resolvers;
