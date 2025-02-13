import { Prisma } from "@prisma/client";

export type PortfolioType = Prisma.PortfolioGetPayload<{
  include: {
    sections: {
      include: { pieces: true };
    };
  };
}>;

export type SectionType = Prisma.SectionGetPayload<{
  include: {
    pieces: true;
  };
}>;
