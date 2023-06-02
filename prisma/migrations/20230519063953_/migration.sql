/*
  Warnings:

  - The `language` column on the `Realtor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `image` to the `Realtor` table without a default value. This is not possible if the table is not empty.
  - Changed the column `specialty` on the `Realtor` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
ALTER TABLE "Otp" ADD COLUMN     "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Realtor" 
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "image" TEXT NOT NULL,
ALTER COLUMN "specialty" SET DATA TYPE TEXT[] USING ARRAY[specialty];

ALTER TABLE "Realtor" 
ALTER COLUMN "status" SET DEFAULT 'PENDING';
