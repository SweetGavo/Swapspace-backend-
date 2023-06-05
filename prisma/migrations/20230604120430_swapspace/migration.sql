/*
  Warnings:

  - Added the required column `number` to the `CoRealtor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoRealtor" ADD COLUMN     "number" TEXT NOT NULL;
