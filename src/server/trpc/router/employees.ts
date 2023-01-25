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

  addAvailability: protectedProcedure
    .input(
      z.object({
        dayOfWeek: z.number(),
        start: z.string(),
        end: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { dayOfWeek, start, end } = input;

      const availability = await ctx.prisma.availability.create({
        data: {
          userId: ctx.session.user.id,
          dayOfWeek,
          start,
          end,
        },
      });

      return availability;
    }),
  getAvailabilities: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const availabilities = await ctx.prisma.availability.findMany({
        where: {
          userId,
        },
      });

      return availabilities;
    }),

  updateAvailability: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        dayOfWeek: z.number(),
        start: z.string(),
        end: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, dayOfWeek, start, end } = input;

      const availability = await ctx.prisma.availability.update({
        where: {
          id,
        },
        data: {
          dayOfWeek,
          start,
          end,
        },
      });

      return availability;
    }),
  deleteAvailability: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const availability = await ctx.prisma.availability.delete({
        where: {
          id: input.id,
        },
      });

      return availability;
    }),
});
