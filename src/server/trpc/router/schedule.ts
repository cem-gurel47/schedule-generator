import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import moment from "moment";

export const scheduleRouter = router({
  createScheduleForWeek: protectedProcedure
    .input(
      z.object({
        date: z.string(),
        department: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { date, department } = input;
      const dateObject = moment(date);
      const dayOfWeek = dateObject.day();
      // this function should create a schedule for the week of the date passed in

      const business = await ctx.prisma.business.findUnique({
        where: {
          id: ctx.session.user.businessId,
        },
      });

      if (!business) {
        return null;
      }
      const { openingHours, closingHours } = business;

      // get all employees in descending order of priority
      const employees = await ctx.prisma.user.findMany({
        where: {
          businessId: ctx.session.user.businessId,
        },
        orderBy: {
          priority: "desc",
        },
      });

      const schedule = [[], [], [], [], [], [], []];

      for (let i = 0; i < employees.length; i++) {
        const dailySchedule = schedule[dayOfWeek];
        const employee = employees[i];
        if (!employee) {
          continue;
        }
        const { startingHours, endingHours } = employee;
        const isEmployeeAvailable =
          startingHours[dayOfWeek] && endingHours[dayOfWeek];

        if (!isEmployeeAvailable) {
          continue;
        }
      }
    }),
  getScheduleForDate: protectedProcedure
    .input(
      z.object({
        date: z.date(),
        department: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      return [];
    }),
});
