/*
  Warnings:

  - Added the required column `clue` to the `TeamTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `TeamTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_time` to the `TeamTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realtorId` to the `TeamTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TeamTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamTask" ADD COLUMN     "break_down" TEXT[],
ADD COLUMN     "clue" TEXT NOT NULL,
ADD COLUMN     "contact" TEXT,
ADD COLUMN     "due_date" TEXT NOT NULL,
ADD COLUMN     "due_time" TEXT NOT NULL,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "realtorId" TEXT NOT NULL,
ADD COLUMN     "teamId" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Info" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "event_link" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "realtorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InfoTeams" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Info_id_key" ON "Info"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_InfoTeams_AB_unique" ON "_InfoTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_InfoTeams_B_index" ON "_InfoTeams"("B");

-- AddForeignKey
ALTER TABLE "TeamTask" ADD CONSTRAINT "TeamTask_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Info" ADD CONSTRAINT "Info_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InfoTeams" ADD CONSTRAINT "_InfoTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InfoTeams" ADD CONSTRAINT "_InfoTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
