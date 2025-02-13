"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPortfolio(id: number) {
  const portfolio = await prisma.portfolio.findFirst({
    where: {
      id: id,
    },
    include: {
      sections: {
        include: { pieces: true },
      },
    },
  });

  return portfolio;
}
