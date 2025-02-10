export const runtime = 'nodejs';

import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers

// export const runtime = "nodejs"; // ⬅ Forces Node.js runtime

// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// // import { PrismaAdapter } from "@auth/prisma-adapter";
// // import { prisma } from "@/prisma"; // Ensure correct path

// const authOptions = {
// //   adapter: PrismaAdapter(prisma),
// //   adapter: PrismaAdapter(),
//   providers: [GitHub],
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };