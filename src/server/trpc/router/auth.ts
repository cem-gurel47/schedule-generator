import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  createBusinessAndManagerAccount: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
        businessName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password, businessName, name } = input;
      const business = await ctx.prisma.business.create({
        data: {
          name: businessName,
        },
      });

      const user = await ctx.prisma.user.create({
        data: {
          name: name,
          email,
          password: await bcrypt.hash(password, 10),
          role: "manager",
          businessId: business.id,
        },
      });

      await ctx.prisma.businessUsers.create({
        data: {
          businessId: business.id,
          userId: user.id,
        },
      });

      return user;
    }),
});
