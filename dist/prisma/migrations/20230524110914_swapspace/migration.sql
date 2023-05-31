/*
  Warnings:

  - Added the required column `realtorId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "realtorId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'CREATOR';
