import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get the first user you find
const user = await prisma.user.findFirst({});

// Make some image records
const image1 = await prisma.image.create({
  data: {
    url: "blank.svg",
    ownerId: user.id,
  },
});
const image2 = await prisma.image.create({
  data: { url: "https://picsum.photos/200/300", ownerId: user.id },
});

// Seed a portfolio to that user
const portfolio = await prisma.portfolio.create({
  data: {
    userId: user?.id || "",
    description: `This is the seeded portfolio for ${user.name}`,
  },
});
// Seed a section into the portfolio
const section = await prisma.section.create({
  data: {
    title: "Front End Web",
    Portfolio: { connect: { id: portfolio.id } },
    // portfolioId: portfolio.id || 1,
    description:
      "Some projects that showcase unique or interesting front ends.",
    backgroundImage: { connect: { id: image1.id } },
    // backgroundImage: image1.id,
  },
});
// Seed a piece into the section
await prisma.piece.create({
  data: {
    name: "Developer Portfolio",
    description:
      "A simple Next.js app router web site hosted on AWS with Prisma ORM connecting to a Postgresql database.",
    primaryImage: 0,
    sectionId: section.id,
    images: {
      connect: [{ id: image1.id }, { id: image2.id }],
    },
  },
});
