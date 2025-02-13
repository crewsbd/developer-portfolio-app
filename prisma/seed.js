import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const user = await prisma.user.findFirst({});

// Seed a portfolio
const portfolio = await prisma.portfolio.create({
  data: {
    userId: user?.id || "",
  },
});
// Seed a section into the portfolio
const section = await prisma.section.create({
  data: {
    title: "Front End Web",
    portfolioId: portfolio.id || 1,
    description:
      "Some projects that showcase unique or interesting front ends.",
    backgroundImage: "https://picsum.photos/200/300",
  },
});
// Seed a piece into the section
const piece = await prisma.piece.create({
  data: {
    name: "Developer Portfolio",
    description:
      "A simple Next.js app router web site hosted on AWS with Prisma ORM connecting to a Postgresql database.",
    primaryImage: "https://picsum.photos/200/300",
    sectionId: section.id,
  },
});
// Seed a secondary image into the piece
await prisma.secondaryImages.create({
  data: {
    fileName: "https://picsum.photos/200/300",
    altText: "Developer Portfolio screenshot",
    pieceId: piece.id,
  },
});
