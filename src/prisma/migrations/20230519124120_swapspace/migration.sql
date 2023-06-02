/*
  Warnings:

  - The `language` column on the `Realtor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "Specalty_Type" ADD VALUE 'Selecte';

-- AlterTable
ALTER TABLE "Realtor" DROP COLUMN "language",
ADD COLUMN     "language" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "verifiedNumber" BOOLEAN NOT NULL DEFAULT false;
