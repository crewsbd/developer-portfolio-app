"use server";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import styles from "@/components/Portfolio.module.css";
type SectionType = Prisma.SectionGetPayload<{
  include: { pieces: { include: { images: true } }; backgroundImage: true };
}>;

export default async function Section({ section }: { section: SectionType }) {
  console.dir(section);

  return (
    <section
      className={styles.portfolio_section}
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.7), rgb(255, 255, 255) ), url("' +
          section.backgroundImage.url +
          '")',
      }}
    >
      <h3>{section.title}</h3>
      <p>{section.description}</p>
      {section.pieces.map((piece) => {
        return (
          <div key={piece.id} className={styles.piece}>
            <Image
              src={piece.images[piece.primaryImage].url}
              // src={piece.images[0].url}
              alt={piece.name}
              width={"200"}
              height={"200"}
            />
            <div className="gallery">
              { piece.images.map((image) => {
                return <Image key={image.id} src={image.url} width={50} height={50} alt="Something"></Image>
              })
              }
            </div>

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
