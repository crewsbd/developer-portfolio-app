"use client";

// import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/components/Portfolio.module.css";
import { updateSection } from "@/app/lib/data";
// import SelectableImage from "./SelectableImage";
import { useEffect, useState } from "react";
import { Section } from "@prisma/client";
import { getSection, getPieceIds } from "@/app/lib/data";
import PieceEditor from "@/components/PieceEditor";

export default function SectionEditor({ sectionId }: { sectionId: number }) {
  // Manage section fetch and state update
  const [section, changeSection] = useState<Section | null>(null);
  useEffect(() => {
    getSection(sectionId)
      .then((response) => response)
      .then((section) => {
        changeSection(section);
        changeTitle(section?.title || "");
        changeDescription(section?.description || "");
        changeBackgroundImageId(section?.imageId || 0);
      });
  }, [sectionId]);

  const [pieceIds, changePieceIds] = useState<number[]>([]);
  useEffect(() => {
    getPieceIds(sectionId)
      .then((response) => response)
      .then((pieces) => {
        changePieceIds(pieces);
      });
  }, [sectionId]);

  const [title, changeTitle] = useState<string>(section?.title || "");
  const [description, changeDescription] = useState<string>(
    section?.description || ""
  );
  const [backgroundImageId, changeBackgroundImageId] = useState<number>(
    section?.imageId || 0
  );

  async function updateSectionHandler(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageId = Number.parseInt(formData.get("imageId") as string);

    await updateSection({
      id: sectionId,
      title: title,
      description: description,
      imageId: imageId,
    });
  }

  return (
    <div className={styles.section}>
      <div className={styles["horizontal-buttons"]}>
        <button
          type="submit"
          form={`section-${sectionId}`}
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
      <form id={`section-${sectionId}`} action={updateSectionHandler}></form>
      <label>Section Title</label>
      <input
        name="title"
        type="text"
        form={`section-${sectionId}`}
        value={title}
        onChange={(event) => {
          changeTitle(event.currentTarget.value);
        }}
      ></input>
      <label>Description</label>
      <textarea
        name="description"
        form={`section-${sectionId}`}
        value={description}
        onChange={(event) => {
          changeDescription(event.currentTarget.value);
        }}
      ></textarea>
      <label>Background</label>
      <Image src={`/blank.svg`} alt="stuff" width={50} height={50} />

      <input
        name="imageId"
        type="hidden"
        form={`section-${sectionId}`}
        value={backgroundImageId}
        onChange={(event) => {
          changeBackgroundImageId(Number.parseInt(event.currentTarget.value));
        }}
      ></input>
      {pieceIds?.map((pieceId) => {
        return <PieceEditor key={pieceId} pieceId={pieceId} />;
      })}

      <div className={styles["horizontal-buttons"]}>
        <button className={styles["icon-button"]} title="Create new work piece">
          <Image
            src="/base/new-dark.svg"
            alt="New piece icon"
            width="50"
            height="50"
          />
        </button>
      </div>
    </div>
  );
}
