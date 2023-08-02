import { baseProcedure, router } from "../trpc";
import { mapsRouter } from "./mapsRouter";

// On Client side you invoke trpc.maps.all where trpc = createTRPCNext<AppRouter>({opts})
export const appRouter = router({
  checkStatus: baseProcedure.query(() => {
    return "Hey Mister";
  }),
  maps: mapsRouter,
});

export type AppRouter = typeof appRouter;
