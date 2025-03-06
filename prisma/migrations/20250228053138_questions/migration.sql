/*
  Warnings:

  - Made the column `portfolioId` on table `Section` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_portfolioId_fkey";

-- AlterTable
ALTER TABLE "Section" ALTER COLUMN "portfolioId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
