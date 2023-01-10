import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const employeeRouter = router({
  getEmployees: protectedProcedure
    .input(
      z.object({
        department: z.string().nullish(),
        position: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { department, position } = input;

      return await ctx.prisma.user.findMany({
        where: {
          department: {
            equals: department || undefined,
          },
          position: {
            equals: position || undefined,
          },
        },
      });
    }),
  createEmployee: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        department: z.string().nullish(),
        position: z.string().nullish(),
        businessId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, department, position, businessId } = input;

      const userData = {
        name,
        email,
        businessId,
      };

      if (department) {
        Object.assign(userData, { department });
      }

      if (position) {
        Object.assign(userData, { position });
      }

      const employee = await ctx.prisma.user.create({
        data: userData,
      });

      return employee;
    }),
  getEmployee: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const employee = await ctx.prisma.user.findUnique({
        where: {
          id,
        },
      });

      return employee;
    }),
});
