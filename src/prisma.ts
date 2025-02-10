// "use server"
export const runtime = 'nodejs';

// import { Pool } from "pg";
// import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// const connectionString = process.env.DATABASE_URL; // TODO: Do these need to be global? Make a big if else?
// const pool = new Pool({ connectionString });
// const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();
// export const prisma = new PrismaClient({adapter});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
