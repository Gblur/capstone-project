import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { createInnerTRPCContext } from "./context";
import { EventEmitter } from "events";

const t = initTRPC.context<typeof createInnerTRPCContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const baseProcedure = t.procedure;
export const ee = new EventEmitter();
