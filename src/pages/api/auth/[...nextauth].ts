import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import bcrypt from "bcryptjs";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import type { User } from "next-auth";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, isNewUser }) {
      if (user) {
        const newToken = {
          isNewUser: isNewUser,
          user: user as User,
        };
        return Promise.resolve(newToken);
      }

      return Promise.resolve(token);
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as User;
      }
      return Promise.resolve(session);
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;

        if (email === "manager@manager.com" && password === "manager") {
          return {
            id: "1",
            email,
            name: "Manager Test",
            role: "manager",
            image: null,
          } as User;
        }
        return null;

        // if (email === "employee@employee.com" && password === "employee") {
        //   return {
        //     id: "2",
        //     email,
        //     name: "Employee Test",
        //     role: "employee",
        //   };
        // }
        // return null;

        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: email,
        //   },
        // });
        // if (!user) {
        //   return null;
        // }
        // const isValid = await bcrypt.compare(password, user.password);
        // if (!isValid) {
        //   console.log("invalid password");
        //   throw new Error("invalid-password");
        // }
        // return user;
      },
    }),

    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
