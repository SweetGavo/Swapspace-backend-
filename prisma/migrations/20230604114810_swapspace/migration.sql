/*
  Warnings:

  - You are about to drop the column `groupId` on the `CoRealtor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoRealtor" DROP CONSTRAINT "CoRealtor_groupId_fkey";

-- AlterTable
ALTER TABLE "CoRealtor" DROP COLUMN "groupId";
