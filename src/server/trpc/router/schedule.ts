import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const scheduleRouter = router({
  getScheduleForDate: publicProcedure
    .input(
      z.object({
        date: z.date(),
        department: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      const { department } = input;
      console.log(department, "department");
      if (department === "Men") {
        return {
          schedule: [
            [
              {
                employee: {
                  name: "Jill Doe",
                  id: "6",
                  position: "Doctor",
                },
                shiftStart: "9:00",
                shiftEnd: "14:00",
              },
              {
                employee: {
                  name: "Jack Doe",
                  id: "5",
                  position: "Doctor",
                },
                shiftStart: "15:00",
                shiftEnd: "17:00",
              },
            ],
          ],
        };
      }
      return {
        // the schedule should display which employees are working on which shifts
        schedule: [
          [
            {
              employee: {
                name: "John Doe",
                id: "1",
                position: "Cashier",
              },
              shiftStart: "14:00",
              shiftEnd: "17:00",
            },
            {
              employee: {
                name: "Jane Doe",
                id: "2",
                position: "Cashier",
              },
              shiftStart: "9:00",
              shiftEnd: "13:00",
            },
          ],
          [
            {
              employee: {
                name: "John Smith",
                id: "3",
                position: "Cashier",
              },
              shiftStart: "9:00",
              shiftEnd: "17:00",
            },
          ],
          [
            {
              employee: {
                name: "Jane Smith",
                id: "4",
                position: "Vet",
              },
              shiftStart: "14:00",
              shiftEnd: "17:00",
            },

            {
              employee: {
                name: "Jack Doe",
                id: "5",
                position: "Doctor",
              },
              shiftStart: "9:00",
              shiftEnd: "13:00",
            },
          ],
          [
            {
              employee: {
                name: "Jill Doe",
                id: "6",
                position: "Doctor",
              },
              shiftStart: "9:00",
              shiftEnd: "14:00",
            },
            {
              employee: {
                name: "Jack Doe",
                id: "5",
                position: "Doctor",
              },
              shiftStart: "15:00",
              shiftEnd: "17:00",
            },
          ],
        ],
      };
    }),
});
