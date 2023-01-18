import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const employeeRouter = router({
  getEmployees: protectedProcedure
    .input(
      z.object({
        // department: z.string().nullish(),
        // position: z.string().nullish(),
      })
    )
    .query(async ({ ctx }) => {
      // const { department, position } = input;

      return await ctx.prisma.user.findMany({
        where: {
          // department: {
          //   contains: department,
          // },
          // position: {
          //   contains: position,
          // },
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
  updateEmployeePriorityAndDepartment: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        priority: z.number().nullish(),
        department: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, priority, department } = input;

      const data = {};

      if (priority) {
        Object.assign(data, { priority });
      }

      if (department) {
        Object.assign(data, { department });
      }

      const employee = await ctx.prisma.user.update({
        where: {
          id,
        },
        data: data,
      });

      return employee;
    }),
  updateEmployeeWorkingHours: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        startingHours: z.array(z.string()),
        endingHours: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, startingHours, endingHours } = input;

      const employee = await ctx.prisma.user.update({
        where: {
          id,
        },
        data: {
          startingHours,
          endingHours,
        },
      });

      return employee;
    }),
  updateEmployeeHourRange: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        minHours: z.number(),
        maxHours: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, minHours, maxHours } = input;

      const employee = await ctx.prisma.user.update({
        where: {
          id,
        },
        data: {
          minHours,
          maxHours,
        },
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
