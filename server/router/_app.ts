import { baseProcedure, router } from "../trpc";
import { todoRouter } from "./actionRouter";

export const appRouter = router({
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;
