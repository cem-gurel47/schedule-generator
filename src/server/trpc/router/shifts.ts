import { router, publicProcedure } from "../trpc";

export const shiftsRouter = router({
  getAllPendingShiftRequests: publicProcedure.query(() => {
    return 1;
  }),
});
