export const runtime = "nodejs";

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  callbacks: {
    async session({ session, user }) {

      // console.log("SESSION ")
      // console.dir(session)
      // console.log("USER")
      // console.dir(user)
      if (session.user) {
        session.user.id = user.id || "";
      }
      return session;
    },
  },
});
