/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `country` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `langitude` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locality` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_Number` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_propertyId_fkey";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "langitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "locality" TEXT NOT NULL,
ADD COLUMN     "postal_code" TEXT NOT NULL,
ADD COLUMN     "street_Number" TEXT NOT NULL;

-- DropTable
DROP TABLE "Location";
