import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
// import { i18n } from "next-i18next.config";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { prisma } from "./prisma";

export async function createInnerTRPCContext() {
  return {
    prisma,
    maps: prisma.maps,
  };
}
