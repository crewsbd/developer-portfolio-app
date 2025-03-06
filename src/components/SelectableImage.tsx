"use client";

// This is an image component that will pull up an image selector when clicked. The id and url are passed back to the parent.
import { ImageManager } from "@/components/ImageManager";
import Image from "next/image";
import { JSX } from "react";
import { useState, } from "react";

export default function SelectableImage({
  defaultImage,
  selectionMutator,
}: {
  defaultImage: string;
  selectionMutator: ({ id, url }: { id: number; url: string }) => null;
}) {
  const [imagePicker, changeImagePicker] = useState<JSX.Element | null>(null);

  return (
    <>
      <Image
        src={defaultImage ? defaultImage : "blank.svg"}
        width={100}
        height={100}
        alt="Whaterver"
        onClick={() => {
          console.log("Changing picker");
          changeImagePicker(
            <ImageManager
              imageDataMutator={selectionMutator}
              onClose={() => {
                console.log("PICKER CLOSE");
                changeImagePicker(null);
              }}
            ></ImageManager>
          );
        }}
      ></Image>
      {imagePicker ? imagePicker : null}
    </>
  );
}
