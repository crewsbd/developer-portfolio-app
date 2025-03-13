import { Prisma, PrismaClient} from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prismaClient = new PrismaClient();

export type PortfolioType = ReturnType<typeof prismaClient.portfolio.findUnique>;
export type SectionType = ReturnType<typeof prismaClient.section.findUnique>;
export type PieceType = ReturnType<typeof prismaClient.piece.findUnique>;
export type ImageType = ReturnType<typeof prismaClient.image.findUnique>;

export type PortfolioTypeComplete = Prisma.PortfolioGetPayload<{
  include: {
    sections: {
      include: { pieces: { include: { images: true } } };
    };
  };
}>;

export type SectionTypeComplete = Prisma.SectionGetPayload<{
  include: {
    pieces: { include: { images: true } };
  };
}>;
