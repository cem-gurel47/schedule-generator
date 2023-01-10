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

  addNewDepartment: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const business = await ctx.prisma.business.update({
        where: {
          id: ctx.session.user.businessId,
        },
        data: {
          departments: {
            push: input.name,
          },
        },
      });

      return business;
    }),
  deleteDepartment: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const businessDepartments = await ctx.prisma.business.findUnique({
        where: {
          id: ctx.session.user.businessId,
        },
      });

      const newDepartments = businessDepartments?.departments.filter(
        (department) => department !== input.name
      );

      const business = await ctx.prisma.business.update({
        where: {
          id: ctx.session.user.businessId,
        },
        data: {
          departments: newDepartments,
        },
      });

      return business;
    }),
  editDepartment: protectedProcedure
    .input(
      z.object({
        oldName: z.string(),
        newName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const businessDepartments = await ctx.prisma.business.findUnique({
        where: {
          id: ctx.session.user.businessId,
        },
      });

      const newDepartments = businessDepartments?.departments.map(
        (department) => {
          if (department === input.oldName) {
            return input.newName;
          }
          return department;
        }
      );
      const business = await ctx.prisma.business.update({
        where: {
          id: ctx.session.user.businessId,
        },
        data: {
          departments: newDepartments,
        },
      });

      return business;
    }),
});
