/*
  Warnings:

  - Made the column `image` on table `CoRealtor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CoRealtor" ALTER COLUMN "image" SET NOT NULL;
