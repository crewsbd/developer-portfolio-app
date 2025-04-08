"use client";

import { getImageById } from "@/app/lib/data";
// This is an image component that will pull up an image selector when clicked. The id and url are passed back to the parent.
import { ImageManager } from "@/components/ImageManager";
import { Image as ImageResult } from "@prisma/client";
import Image from "next/image";
import { useState, JSX, useEffect } from "react";

export default function SelectableImage({
  //TODO: This needs to take an imageID number, fetch it from DB and other stuff...
  imageId,
  imageIdsMutator,
}: {
  imageId: number;
  imageIdsMutator: (newValue: number) => void;
}) {
  const [imagePicker, changeImagePicker] = useState<JSX.Element | null>(null);

  const [image, changeImage] = useState<ImageResult | null>(null);
  useEffect(() => {
    (async () => {
      const result = await getImageById(imageId);
      changeImage(result);
    })();
  }, [imageId]);

  return (
    <>
      <Image
        src={image?.url ? image.url : "/blank.svg"}
        width={100}
        height={100}
        alt="Whaterver"
        onClick={() => {
          console.log("Changing picker");
          changeImagePicker(
            <ImageManager
              imageDataMutator={imageIdsMutator}
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
