import { z } from "zod";
import { baseProcedure, router } from "../trpc";

export const todoRouter = router({
  all: baseProcedure.query(({ ctx }) => {
    return ctx.maps.findMany({
      orderBy: {},
    });
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
  // edit: baseProcedure
  //   .input(
  //     z.object({
  //       id: z.string().uuid(),
  //       data: z.object({
  //         completed: z.boolean().optional(),
  //         text: z.string().min(1).optional(),
  //       }),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const { id, data } = input;
  //     const todo = await ctx.maps.update({
  //       where: { id },
  //       data,
  //     });
  //     return todo;
  //   }),
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
