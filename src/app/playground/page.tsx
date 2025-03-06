"use client";


import { useState } from "react";
import SelectableImage from "@/components/SelectableImage";

export default function Page() {
  // const [dialogOpen, setDialogOpen] = useState<boolean>(true);
  const [imageData, changeImageData] = useState<{ id: number; url: string }>({
    id: 1,
    url: "blank.svg",
  });
  // const [imagePicker, changeImagePicker] = useState<JSX.Element | null>(null);

  return (
    <>
      <h2>Playground</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.
      </p>

      <p>Input1: {imageData.id ? imageData.id : "none"}</p>
      <SelectableImage
        defaultImage={imageData.url}
        selectionMutator={changeImageData}
      ></SelectableImage>

      {/* <Image
        src={imageData.url ? imageData.url : ""}
        width={100}
        height={100}
        alt="Whaterver"
        onClick={() => {
          console.log("Changing picker");
          changeImagePicker(
            <ImageManager
              imageDataMutator={changeImageData}
              onClose={() => {
                console.log("PICKER CLOSE");
                changeImagePicker(null);
              }}
            ></ImageManager>
          );
        }}
      ></Image>
      {imagePicker ? imagePicker : null} */}
    </>
  );
}
