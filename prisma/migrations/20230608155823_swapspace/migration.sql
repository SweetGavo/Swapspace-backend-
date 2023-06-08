/*
  Warnings:

  - You are about to drop the column `compant_name` on the `Realtor` table. All the data in the column will be lost.
  - Added the required column `company_name` to the `Realtor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Realtor" DROP COLUMN "compant_name",
ADD COLUMN     "company_name" TEXT NOT NULL;
