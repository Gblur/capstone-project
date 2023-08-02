import { z } from "zod";
import { baseProcedure, router } from "../trpc";
import { ee } from "../trpc";
import { maps } from "prisma/prisma-client";
import { observable } from "@trpc/server/observable";

export const mapsRouter = router({
  all: baseProcedure.query(({ ctx }) => {
    return ctx.maps.findMany();
  }),
  byId: baseProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      const { id } = input;
      return ctx.maps.findUnique({ where: { id } });
    }),
  // add: baseProcedure
  //   .input(
  //     z.object({
  //       id: z.string().optional(),
  //       text: z.string().min(1),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const todo = await ctx.maps.create({
  //       data: input,
  //     });
  //     return todo;
  //   }),
  // update nodes and edges of map by id
  edit: baseProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: z.object({
          nodes: z.string(),
          edges: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;

      const updateMap = await ctx.maps.update({
        where: { id },
        data,
      });

      ee.emit("update", updateMap);

      return updateMap;
    }),

  onUpdate: baseProcedure.subscription(() => {
    return observable((emit) => {
      const onUpdate = (data: maps) => {
        emit.next(data);
      };
      ee.on("add", onUpdate);
      return () => {
        ee.off("add", onUpdate);
      };
    });
  }),
  // toggleAll: baseProcedure
  //   .input(z.object({ completed: z.boolean() }))
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.maps.updateMany({
  //       data: { completed: input.completed },
  //     });
  //   }),
  // delete: baseProcedure
  //   .input(z.string().uuid())
  //   .mutation(async ({ ctx, input: id }) => {
  //     await ctx.maps.delete({ where: { id } });
  //     return id;
  //   }),
  // clearCompleted: baseProcedure.mutation(async ({ ctx }) => {
  //   await ctx.maps.deleteMany({ where: { completed: true } });

  //   return ctx.maps.findMany();
  // }),
});
