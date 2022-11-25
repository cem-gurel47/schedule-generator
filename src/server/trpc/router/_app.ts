import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { shiftsRouter } from "./shifts";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  shifts: shiftsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
