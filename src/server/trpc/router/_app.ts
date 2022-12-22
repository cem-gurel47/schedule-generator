import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { shiftsRouter } from "./shifts";
import { businessRouter } from "./business";
import { scheduleRouter } from "./schedule";
import { employeeRouter } from "./employees";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  shifts: shiftsRouter,
  business: businessRouter,
  schedule: scheduleRouter,
  employees: employeeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
