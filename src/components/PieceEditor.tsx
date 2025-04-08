"use client";

import { useEffect, useState } from "react";
import { Piece } from "@prisma/client";
import { getPiece, getImageIdsForPiece, updatePiece } from "@/app/lib/data";
import styles from "@/components/Portfolio.module.css";
import Image from "next/image";
import SelectableImage from "./SelectableImage";

export default function PieceEditor({ pieceId }: { pieceId: number }) {
  const [piece, changePiece] = useState<Piece | null>(null);
  const [name, changeName] = useState<string>(piece?.name || "");
  const [description, changeDescription] = useState<string>(
    piece?.description || ""
  );
  const [primaryImage, changePrimaryImage] = useState<number>(
    piece?.primaryImage || 0
  );

  useEffect(() => {
    getPiece(pieceId)
      .then((result) => result)
      .then((pieceData) => {
        changePiece(pieceData);
        changeName(pieceData?.name || "");
        changeDescription(pieceData?.description || "");
        changePrimaryImage(pieceData?.primaryImage || 0);
      });
  }, [pieceId]);

  const [imageIDs, changeImageIDs] = useState<number[]>([]);
  useEffect(() => {
    getImageIdsForPiece(pieceId)
      .then((response) => response)
      .then((images) => {
        changeImageIDs(images);
      });
  }, [pieceId]);

  async function updatePieceHandler(formData: FormData) {
    const title = (formData.get("name") as string) || "";
    const description = (formData.get("description") as string) || "";
    const primaryImageId =
      Number.parseInt(formData.get("primaryImageId") as string) || 1;

    await updatePiece({
      id: pieceId,
      name: title,
      description: description,
      imageId: primaryImageId,
      images: imageIDs,
      sectionId: piece?.sectionId || 1,
    });
  }

  return (
    <div className={styles.piece}>
      <form id={`piece-${pieceId}`} action={updatePieceHandler}></form>
      <div className={styles["horizontal-buttons"]}>
        <button
          type="submit"
          form={`piece-${pieceId}`}
          className={styles["icon-button"]}
        >
          <Image
            src="/base/save-dark.svg"
            alt="Save icon"
            width="50"
            height="50"
          />
        </button>
        <button className={styles["icon-button"]}>
          <Image
            src="/base/delete-dark.svg"
            alt="Delete icon"
            width="50"
            height="50"
          />
        </button>
      </div>
      <label>Piece Name</label>
      <input
        name="name"
        value={name}
        form={`piece-${pieceId}`}
        onChange={(event) => changeName(event.currentTarget.value)}
      ></input>
      <label>Description</label>
      <textarea
        name="description"
        value={description}
        form={`piece-${pieceId}`}
        onChange={(event) => changeDescription(event.currentTarget.value)}
      ></textarea>
      <label>primaryImage</label>
      <input
        name="primaryImageId"
        value={primaryImage}
        form={`piece-${pieceId}`}
        onChange={(event) =>
          changePrimaryImage(Number.parseInt(event.currentTarget.value))
        }
      ></input>
      {imageIDs?.map((imageId, index) => {
        return (
          <SelectableImage
            key={index}
            imageId={imageId}
            imageIdsMutator={(newValue: number) => {
              const newImageIDs = [...imageIDs];
              newImageIDs[index] = newValue;
              changeImageIDs(newImageIDs);
            }}
          />
        );
      })}
    </div>
  );
}
