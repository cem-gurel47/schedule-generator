import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import moment from "moment";
import {
  getEmployeeAvailabilitiesForDayOfWeek,
  findConstraintsForTheEmployee,
  getLongestAvailableTimeForEmployee,
  getShiftDurationAsHours,
  checkIfConstraintsAreSatisfied,
} from "@utils/helpers";

export const scheduleRouter = router({
  createScheduleForWeek: protectedProcedure
    .input(
      z.object({
        date: z.string(), // date of the monday of the week
        department: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { date, department } = input;
      const dateObject = moment(date);

      // this function should create a schedule for the week of the date passed in

      const business = await ctx.prisma.business.findUnique({
        where: {
          id: ctx.session.user.businessId,
        },
      });
      if (!business) throw new Error("Business not found");

      // get all employees in descending order of priority
      const employeesPromise = ctx.prisma.user.findMany({
        where: {
          businessId: ctx.session.user.businessId,
        },
        orderBy: {
          priority: "desc",
        },
      });

      const constraintsPromise = ctx.prisma.constraint.findMany({
        where: {
          businessId: ctx.session.user.businessId,
        },
      });

      const [employees, constraints] = await Promise.all([
        employeesPromise,
        constraintsPromise,
      ]);

      employees.forEach(async (employee) => {
        let employeeWorkingHourCount = 0;
        const availabilities = await ctx.prisma.availability.findMany({
          where: {
            userId: employee.id,
          },
        });

        const { maxHours } = employee;

        for (let i = 0; i < 7; i++) {
          if (employeeWorkingHourCount >= maxHours) break;
          const day = dateObject.clone().add(i, "days");
          const dayOfWeek = day.day();

          const employeeAvailabilitiesForDayOfWeek =
            getEmployeeAvailabilitiesForDayOfWeek(availabilities, dayOfWeek);

          const constraintsForEmployee = findConstraintsForTheEmployee(
            constraints,
            employeeAvailabilitiesForDayOfWeek,
            employee,
            dayOfWeek
          );

          // get all the shift for the day

          const shiftsForDay = await ctx.prisma.shift.findMany({
            where: {
              date: day.toDate().toString(),
              businessId: ctx.session.user.businessId,
            },
          });

          let constraintsWithSatisfiedStatus = constraintsForEmployee;

          if (constraintsForEmployee.length > 0) {
            constraintsWithSatisfiedStatus = checkIfConstraintsAreSatisfied(
              constraintsForEmployee,
              shiftsForDay
            );
          }

          if (employeeAvailabilitiesForDayOfWeek.length === 0) continue;
          else if (employeeAvailabilitiesForDayOfWeek.length === 1) {
            if (constraintsWithSatisfiedStatus.length === 0) {
              const longestAvailability = getLongestAvailableTimeForEmployee(
                employeeAvailabilitiesForDayOfWeek
              );

              await ctx.prisma.shift.create({
                data: {
                  start: longestAvailability.start,
                  end: longestAvailability.end,
                  userId: employee.id,
                  businessId: ctx.session.user.businessId,
                  date: day.toDate().toString(),
                },
              });
              const shiftDuration =
                getShiftDurationAsHours(longestAvailability);

              employeeWorkingHourCount += shiftDuration;
              continue;
            } else {
              // there is a constraint during the employee's availability
            }
          } else {
            // employee has multiple availabilities for the day
            if (constraintsWithSatisfiedStatus.length === 0) {
              const longestAvailability = getLongestAvailableTimeForEmployee(
                employeeAvailabilitiesForDayOfWeek
              );

              await ctx.prisma.shift.create({
                data: {
                  start: longestAvailability.start,
                  end: longestAvailability.end,
                  userId: employee.id,
                  businessId: ctx.session.user.businessId,
                  date: day.toDate().toString(),
                },
              });
              const shiftDuration =
                getShiftDurationAsHours(longestAvailability);

              employeeWorkingHourCount += shiftDuration;
              continue;
            }
          }

          // constraints for the day

          if (constraintsForEmployee.length === 0) {
            // this means there are no constraints for the day so we can just create a schedule for the employee.
            // we should choose the longest available time for the employee and create a schedule for that time.

            const longestAvailability = getLongestAvailableTimeForEmployee(
              employeeAvailabilitiesForDayOfWeek
            );

            const shift = await ctx.prisma.shift.create({
              data: {
                start: longestAvailability.start,
                end: longestAvailability.end,
                userId: employee.id,
                businessId: ctx.session.user.businessId,
                date: day.toDate().toString(),
              },
            });
            employeeWorkingHourCount += moment
              .duration(moment(shift.end).diff(moment(shift.start)))
              .asHours();
          }
          // } else {
          //   const constraintsWithMaxLimit = constraintsForEmployee.filter(
          //     (constraint) => constraint.type === "MAX"
          //   );

          //   if (constraintsWithMaxLimit.length > 0) {
          //     // this means that there is a maximum employee limit for the day.
          //     // We should check if the number of employees working on the day is less than the maximum limit.

          //     const shiftsForTheDay = await ctx.prisma.shift.findMany({
          //       where: {
          //         businessId: ctx.session.user.businessId,
          //         date: day.toDate().toString(),
          //       },
          //     });

          //     const shiftsDuringEmployeeAvailabilities = shiftsForTheDay.filter(
          //       (shift) =>
          //         moment(shift.start).isBetween(
          //           moment(employeeAvailabilitiesForDayOfWeek[0].start),
          //           moment(employeeAvailabilitiesForDayOfWeek[0].end)
          //         ) ||
          //         moment(shift.end).isBetween(
          //           moment(employeeAvailabilitiesForDayOfWeek[0].start),
          //           moment(employeeAvailabilitiesForDayOfWeek[0].end)
          //         )
          //     );

          //     if (
          //       shiftsDuringEmployeeAvailabilities.length <
          //       constraintsWithMaxLimit[0].limit
          //     ) {
          //       // this means that the number of employees working on the day is less than the maximum limit.
          //       // We should create a schedule for the employee.

          //       const longestAvailability = getLongestAvailableTimeForEmployee(
          //         employeeAvailabilitiesForDayOfWeek
          //       );

          //       await ctx.prisma.shift.create({
          //         data: {
          //           start: longestAvailability.start,
          //           end: longestAvailability.end,
          //           userId: employee.id,
          //           businessId: ctx.session.user.businessId,
          //           date: day.toDate().toString(),
          //         },
          //       });
          //     }
          //   } else {
          //     const longestAvailability = getLongestAvailableTimeForEmployee(
          //       employeeAvailabilitiesForDayOfWeek
          //     );

          //     await ctx.prisma.shift.create({
          //       data: {
          //         start: longestAvailability.start,
          //         end: longestAvailability.end,
          //         userId: employee.id,
          //         businessId: ctx.session.user.businessId,
          //         date: day.toDate().toString(),
          //       },
          //     });
          //   }
          // }
        }
      });
    }),

  getScheduleForDate: protectedProcedure
    .input(
      z.object({
        date: z.date(),
        department: z.string().nullish(),
      })
    )
    .query(async () => {
      return [];
    }),
});
