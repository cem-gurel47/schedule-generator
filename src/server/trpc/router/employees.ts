import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const employeeRouter = router({
  getEmployees: publicProcedure
    .input(
      z.object({
        department: z.string().nullish(),
        position: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      if (input.department === "Men") {
        return [
          {
            name: "John Doe",
            id: "1",
            position: "Cashier",
            department: "Men",
            email: "johndoe@gmail.com",
            phone: "1234567890",
          },
        ];
      } else if (input.department === "Women") {
        return [
          {
            name: "Jane Doe",
            id: "2",
            position: "Cashier",
            department: "Women",
            email: "janedoe@gmail.com",
            phone: "1234567890",
          },
        ];
      }
      return [
        {
          name: "Jill Doe",
          id: "6",
          position: "Doctor",
          email: "jilldoe@gmail.com",
          phone: "1234567890",
        },
        {
          name: "Jack Doe",
          id: "5",
          position: "Doctor",
          email: "jackdoe@gmail.com",
          phone: "1234567890",
        },
      ];
    }),
  getEmployee: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input }) => {
      const { id } = input;
      return {
        name: "John Doe",
        id,
        position: "Cashier",
        department: "Men",
        email: "john@gmail.com",
        phone: "1234567890",
        priority: 5,
      };
    }),
});
