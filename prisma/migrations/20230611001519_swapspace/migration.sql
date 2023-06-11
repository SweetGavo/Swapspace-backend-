/*
  Warnings:

  - You are about to drop the column `assignee` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `closing_date_and_time` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `collaborator` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `due_date_and_time` on the `Task` table. All the data in the column will be lost.
  - Added the required column `closing_date` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closing_time` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_time` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Availablity_Type" AS ENUM ('Available', 'Unavailable', 'Sold');

-- CreateEnum
CREATE TYPE "Property_Status" AS ENUM ('Reviwing', 'Live', 'Declined');

-- CreateEnum
CREATE TYPE "CoRealtorId" AS ENUM ('CO_REALTOR_1', 'CO_REALTOR_2', 'NONE');

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "availablity" "Availablity_Type" NOT NULL DEFAULT 'Available',
ADD COLUMN     "status" "Property_Status" NOT NULL DEFAULT 'Reviwing';

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "assignee",
DROP COLUMN "closing_date_and_time",
DROP COLUMN "collaborator",
DROP COLUMN "due_date_and_time",
ADD COLUMN     "closing_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "closing_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "coRealtorId" "CoRealtorId" DEFAULT 'NONE',
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "due_time" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "_TaskProperties" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskProperties_AB_unique" ON "_TaskProperties"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskProperties_B_index" ON "_TaskProperties"("B");

-- AddForeignKey
ALTER TABLE "_TaskProperties" ADD CONSTRAINT "_TaskProperties_A_fkey" FOREIGN KEY ("A") REFERENCES "CoRealtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskProperties" ADD CONSTRAINT "_TaskProperties_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
