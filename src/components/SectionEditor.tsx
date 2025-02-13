"use client";

// import { useEffect, useState } from "react";

import styles from "@/components/Portfolio.module.css";
import { SectionType } from "@/app/lib/types";

export default function SectionEditor({ section }: { section: SectionType }) {
 

  console.log("SECTION LOADED?");
  console.dir(section);
  return (
    <div className={styles.section}>
      <h3>{section.title}</h3>
      <p>{section.description}</p>
      {section?.pieces.map((piece) => (
        <div key={piece.id} className={styles.piece}>
          <h4>{piece.name}</h4>
          <p>{piece.description}</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      ))}
      <button>+ Add New Work Piece</button>
      <button>- Delete Section</button>
    </div>
  );
}
