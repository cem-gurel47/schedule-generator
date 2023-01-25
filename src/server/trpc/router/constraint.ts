import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const constraintRouter = router({
  getAllConstraints: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.constraint.findMany({
      where: {
        businessId: ctx.session.user.businessId,
      },
    });
  }),
  createConstraint: protectedProcedure
    .input(
      z.object({
        dayOfWeek: z.number(),
        start: z.string(),
        end: z.string(),
        position: z.string(),
        type: z.enum(["MIN", "MAX", "EXACT"]),
        department: z.string(),
        constraint: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const constraint = await ctx.prisma.constraint.create({
        data: {
          ...input,
          businessId: ctx.session.user.businessId,
        },
      });
      return constraint;
    }),

  updateConstraint: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        dayOfWeek: z.number(),
        start: z.string(),
        end: z.string(),
        position: z.string(),
        constraint: z.number(),
        department: z.string(),
        type: z.enum(["MIN", "MAX", "EXACT"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const constraint = await ctx.prisma.constraint.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
      return constraint;
    }),

  deleteConstraint: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const constraint = await ctx.prisma.constraint.delete({
        where: {
          id: input.id,
        },
      });
      return constraint;
    }),
});
