-- AlterTable
ALTER TABLE "Piece" ADD COLUMN     "sectionId" INTEGER;

-- AddForeignKey
ALTER TABLE "Piece" ADD CONSTRAINT "Piece_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
