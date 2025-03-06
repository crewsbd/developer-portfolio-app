"use client";

// import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/components/Portfolio.module.css";
import { SectionType } from "@/app/lib/types";
import { updatePiece } from "@/app/lib/data";
import SelectableImage from "./SelectableImage";

export default function SectionEditor({ section }: { section: SectionType }) {
  async function updatePieceHandler(formData: FormData) {
    const id = formData.get("") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("imageFile") as Blob;
    const sectionId = formData.get("sectionId") as string;

    const result = await updatePiece({
      id: Number.parseInt(id),
      name: name,
      description: description,
      imageFile: imageFile,
      sectionId: Number.parseInt(sectionId),
    });
    if (!result) {
      console.error("a problem occured");
    }
  }

  console.log("SECTION LOADED?");
  console.dir(section);
  return (
    <div className={styles.section}>
      <h3>{section.title}</h3>
      <p>{section.description}</p>
      {section?.pieces.map((piece) => (
        <div key={piece.id} className={styles.piece}>
          <form action={updatePieceHandler}>
            <label>Name</label>
            <input type="text" defaultValue={piece.name} name="name"></input>
            <label>Description</label>
            <textarea
              defaultValue={piece.description}
              name="description"
            ></textarea>
            {/* <Image
              src={piece.primaryImage}
              alt={piece.name}
              width={200}
              height={300}
            ></Image> */}
            <Image
              src={piece.images[piece.primaryImage].url}
              width={100}
              height={100}
              alt="stuff"
            ></Image>
            {piece.images.map((image) => {
              return (
                <SelectableImage
                  key={image.id}
                  defaultImage={image.url}
                  selectionMutator={({
                    id,
                    url,
                  }: {
                    id: number;
                    url: string;
                  }) => {
                    const a = id;
                    const b = url;
                    return null;
                  }}
                ></SelectableImage>
              );
            })}

            <input type="file" name="imageFile"></input>
            <input
              type="hidden"
              defaultValue={`${piece.sectionId}`}
              name="sectionId"
            ></input>
            <input type="hidden" defaultValue={piece.id} name="id"></input>

            <div className={styles["horizontal-buttons"]}>
              <button type="submit">Save</button>
              <button>Delete</button>
            </div>
          </form>
        </div>
      ))}
      <button>+ Add New Work Piece</button>
      <button>- Delete Section</button>
    </div>
  );
}
