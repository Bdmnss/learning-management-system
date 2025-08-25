/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `Lecture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Lecture" DROP COLUMN "videoUrl",
ADD COLUMN     "videoFileId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Lecture" ADD CONSTRAINT "Lecture_videoFileId_fkey" FOREIGN KEY ("videoFileId") REFERENCES "public"."File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
