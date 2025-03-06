import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Section from "./Section";
import { auth } from "@/auth";
import styles from "@/components/Portfolio.module.css";

const prisma = new PrismaClient();

// type PortfolioType = Prisma.PortfolioGetPayload<{
//   include: {
//     sections: {
//       include: { pieces: true };
//     };
//   };
// }>;

export default async function Portfolio({ id }: { id: number }) {
  const session = await auth();
  //Get the portfolio specified by id
  const portfolio = await prisma.portfolio.findFirst({
    where: {
      id: id,
    },
    include: {
      sections: {
        include: {
          pieces: { include: { images: true } },
          backgroundImage: true,
        },
      },
    },
  });

  console.dir(portfolio);

  return (
    <>
      <div className={styles.portfolio}>
        <h2>{session?.user?.name}&apos;s Portfolio </h2>
        {portfolio?.sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </div>
      <div>
        <Link href={`/portfolio/${id}/edit`}>Edit</Link>
      </div>
    </>
  );
}
