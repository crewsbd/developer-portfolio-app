"use client";

import { useEffect, useState } from "react";
import { Piece } from "@prisma/client";
import { getPiece } from "@/app/lib/data";
import styles from "@/components/Portfolio.module.css";
import Image from "next/image";

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

  return (
    <div className={styles.piece}>
      <div className={styles["horizontal-buttons"]}>
        <button className={styles["icon-button"]}>
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
        value={name}
        onChange={(event) => changeName(event.currentTarget.value)}
      ></input>
      <label>Description</label>
      <textarea
        value={description}
        onChange={(event) => changeDescription(event.currentTarget.value)}
      ></textarea>
      <label>primaryImage</label>
      <input
        value={primaryImage}
        onChange={(event) =>
          changePrimaryImage(Number.parseInt(event.currentTarget.value))
        }
      ></input>
    </div>
  );
}
