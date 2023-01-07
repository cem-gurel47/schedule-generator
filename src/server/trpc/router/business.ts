import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const businessRouter = router({
  getBusiness: protectedProcedure.query(async ({ ctx }) => {
    const business = await ctx.prisma.business.findUnique({
      where: {
        id: ctx.session.user.businessId,
      },
    });

    return business;
  }),
  updateBusiness: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        departments: z.array(z.string()).optional(),
        openingHours: z.array(z.string()).optional(),
        closingHours: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const business = await ctx.prisma.business.update({
        where: {
          id: ctx.session.user.businessId,
        },
        data: {
          ...input,
        },
      });

      return business;
    }),
  updateBusinessImage: protectedProcedure
    .input(
      z.object({
        imageLink: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const business = await ctx.prisma.business.update({
        where: {
          id: ctx.session.user.businessId,
        },
        data: {
          image: input.imageLink,
        },
      });
      return business;
    }),
  updateBusinessHours: protectedProcedure
    .input(
      z.object({
        openingHours: z.array(z.string()),
        closingHours: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const business = await ctx.prisma.business.update({
        where: {
          id: ctx.session.user.businessId,
        },
        data: {
          ...input,
        },
      });

      return business;
    }),
  getPositions: protectedProcedure
    .input(
      z.object({
        department: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      const { department } = input;
      if (department === "Men") {
        return ["Cashier", "Doctor", "Nurse"];
      }
      if (department === "Women") {
        return ["Receptionist", "Pilot"];
      }
    }),
});
