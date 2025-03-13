"use server";
import { PrismaClient } from "@prisma/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/app/lib/storage";
// import { PortfolioType } from "./types";
import { error } from "console";

const prisma = new PrismaClient();

export async function getPortfolio(id: number) {
  const portfolio = await prisma.portfolio.findFirst({
    where: {
      id: id,
    },
  });
  return portfolio;
}

export async function updatePortfolio(data: {
  id: number;
  description: string;
}) {
  if (data && data.id) {
    await prisma.portfolio.update({
      where: { id: data.id },
      data: {
        description: data.description,
      },
    });
  } else {
    throw error("Malformed data");
  }
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

export async function getSection(id: number) {
  const section = await prisma.section.findFirst({
    where: {
      id: id,
    },
  });
  return section;
}

export async function getSectionIds(portfolioId: number) {
  const sectionIds = await prisma.section.findMany({
    where: { portfolioId: portfolioId },
    select: {
      id: true,
    },
  });
  const idList = sectionIds.map((section) => {
    return section.id;
  });
  return idList;
}

export async function updateSection(sectionData: {
  id: number;
  title: string;
  description: string;
  imageId: number;
}) {
  await prisma.section.update({
    where: {
      id: sectionData.id,
    },
    data: {
      title: sectionData.title,
      description: sectionData.description,
      imageId: sectionData.imageId,
    },
  });
}

export async function getPiece(pieceId: number) {
  const piece = await prisma.piece.findFirst({
    where: { id: pieceId },
  });
  return piece;
}

export async function getPieceIds(sectionId: number) {
  const pieceIds = await prisma.piece.findMany({
    where: { sectionId: sectionId },
    select: {
      id: true,
    },
  });
  const idList = pieceIds.map((piece) => {
    return piece.id;
  });
  return idList;
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
