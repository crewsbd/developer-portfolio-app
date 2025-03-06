"use server";
import { PrismaClient } from "@prisma/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/app/lib/storage";

const prisma = new PrismaClient();

export async function getPortfolio(id: number) {
  const portfolio = await prisma.portfolio.findFirst({
    where: {
      id: id,
    },
    include: {
      sections: {
        include: { 
          pieces: { 
            include: { 
              images: true } } },
      },
    },
  });

  
  return portfolio;
}
export async function getPortfolioNames() {
  const portfolios = await prisma.portfolio.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return portfolios;
}

export async function updatePiece(piece: {
  id: number;
  name: string;
  description: string;
  imageId: number;
  sectionId: number;
}) {
  // TODO: Store image. Store in S3?

  const result = await prisma.piece.update({
    where: {
      id: 1,
    },
    data: {
      name: piece.name,
      description: piece.description,
      primaryImage: 1,
      sectionId: piece.sectionId,
    },
  });
  return result;
}

export async function getUserImages(id: string) {
  const imageRecords = await prisma.image.findMany({
    where: { ownerId: id },
  });
  return imageRecords;
}

export async function postImage(formData: FormData) {
  const imageFile = formData.get("file") as File | null;
  const userId = formData.get("userId") as string | null;
  console.log("userId " + userId);

  console.dir(formData);
  if (imageFile && userId) {
    const result = await uploadImage(imageFile);
    if (!result) {
      throw new Error("Internal error uploading file");
    }
    const dbResult = await prisma.image.create({
      data: {
        url: `${process.env.S3_BUCKET_BASE_URL}${result.fileName}`,
        ownerId: userId,
      },
    });
    console.log(dbResult);
    console.dir(dbResult);
    // return result
  } else {
    throw new Error("Error in form data");
  }
}

export async function uploadImage(image: File) {
  if (!image) {
    throw new Error("No image sent");
  }

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = `user-images/${Date.now()}-${image.name}`;

  const putParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: image.type,
  };

  await s3Client.send(new PutObjectCommand(putParams));

  return { success: true, fileName };
}
