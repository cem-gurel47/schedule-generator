import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const businessRouter = router({
  getBusiness: publicProcedure.query(() => {
    return {
      name: "Petco",
      id: "1",
      openingHours: ["9:00", "9:00", "9:00", "9:00", "9:00", "9:00", null],
      closingHours: [
        "17:00",
        "17:00",
        "17:00",
        "17:00",
        "17:00",
        "17:00",
        null,
      ],
      logoURL: "https://placeimg.com/200/200/nature",
      departments: ["Men", "Women", "Kids"],
    };
  }),
  getDepartments: publicProcedure.query(() => {
    return ["Men", "Women", "Kids"];
  }),
  getPositions: publicProcedure
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
