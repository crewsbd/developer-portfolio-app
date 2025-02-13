"use server";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import styles from "@/components/Portfolio.module.css";
type SectionType = Prisma.SectionGetPayload<{
  include: { pieces: true };
}>;

export default async function Section({ section }: { section: SectionType }) {
  console.dir(section)
  return (
    <section
      className={styles.portfolio_section}
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7) ), url("' +
          section.backgroundImage +
          '")',
      }}
    >
      <h3>{section.title}</h3>
      <p>{section.description}</p>
      {section.pieces.map((piece) => {
        return (
          <div key={piece.id} className={styles.piece}>
            <Image
              src={piece.primaryImage}
              alt={piece.name}
              width={"200"}
              height={"200"}
            />
            <div>
              <h4>{piece.name}</h4>
              <p>{piece.description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
