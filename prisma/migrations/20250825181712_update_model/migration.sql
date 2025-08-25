/*
  Warnings:

  - You are about to drop the column `videoFileId` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the `_LectureAttachments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Lecture" DROP CONSTRAINT "Lecture_videoFileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_LectureAttachments" DROP CONSTRAINT "_LectureAttachments_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_LectureAttachments" DROP CONSTRAINT "_LectureAttachments_B_fkey";

-- AlterTable
ALTER TABLE "public"."Lecture" DROP COLUMN "videoFileId",
ADD COLUMN     "videoUrl" TEXT;

-- DropTable
DROP TABLE "public"."_LectureAttachments";

-- CreateTable
CREATE TABLE "public"."Attachment" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "uploadedById" INTEGER NOT NULL,
    "lectureId" INTEGER,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Attachment" ADD CONSTRAINT "Attachment_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attachment" ADD CONSTRAINT "Attachment_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "public"."Lecture"("id") ON DELETE SET NULL ON UPDATE CASCADE;
