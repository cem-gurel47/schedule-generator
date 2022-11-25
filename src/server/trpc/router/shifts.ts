import { router, protectedProcedure } from "../trpc";

export const shiftsRouter = router({
  getAllPendingShiftRequests: protectedProcedure.query(() => {
    return 1;
  }),
});
