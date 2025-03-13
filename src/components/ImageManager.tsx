"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/ImageManager.module.css";
import { postImage } from "@/app/lib/data";
import { useSession } from "next-auth/react";
import { Image as ModelImage } from "@prisma/client";
import { getUserImages } from "@/app/lib/data";
// import { useRouter } from "next/navigation";

// TODO: Implement object to update, to get selected image to correct field.
export function ImageManager({
  imageDataMutator,

  onClose,
}: {
  imageDataMutator: ({ id, url }: { id: number; url: string }) => null;
  onClose: () => void;
}) {
  // Setup
  const { data: session } = useSession();
  const dialogReference = useRef<HTMLDialogElement>(null);
  const [userImages, changeUserImages] = useState<ModelImage[]>([]);
  const [refresher, changeRefresher] = useState<number>(0);

  console.log("An image manager was instantiated");

  // Show the modal as soon as it exists
  useEffect(() => {
    if (dialogReference) {
      dialogReference.current?.showModal();
    }
  });

  // Fetch the users images
  useEffect(() => {
    async function loadImages() {
      if (session?.user?.id) {
        const images = await getUserImages(session?.user?.id);
        changeUserImages(images);
      }
    }
    loadImages();
  }, [session?.user?.id, refresher]);

  // Template
  return (
    <dialog
      className={styles.imageManager}
      ref={dialogReference}
      onClick={onClose}
    >
      <div
        className={styles.innerDialog}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <h2>Images</h2>
        <div className={styles["image-gallery"]}>
          {userImages.map((image) => {
            return (
              <Image
                key={image.id}
                src={image.url}
                width={50}
                height={50}
                alt={`User generated image ${image.id}`}
                unoptimized={true}
                onClick={() => {
                  imageDataMutator({ id: image.id, url: image.url });
                }}
              ></Image>
            );
          })}
        </div>
        <form
          action={(formData) => {
            postImage(formData).then(() => {
              setTimeout(() => {
                changeRefresher((prev) => prev + 1);
              }, 2000);
            });
          }}
        >
          <input
            type="hidden"
            name="userId"
            value={session?.user?.id ?? ""}
          ></input>
          <input type="file" name="file"></input>
          <button type="submit">Upload Image</button>
        </form>
      </div>
    </dialog>
  );
}
