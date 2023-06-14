/*
  Warnings:

  - You are about to drop the column `status` on the `Offers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Offers` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_name` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listing_type` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_title` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_type` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realtorId` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Offers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('Inquiry', 'Negotiation', 'Acceptance', 'Payment');

-- DropForeignKey
ALTER TABLE "Offers" DROP CONSTRAINT "Offers_userId_fkey";

-- AlterTable
ALTER TABLE "Offers" DROP COLUMN "status",
DROP COLUMN "userId",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "client_name" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "listingId" TEXT,
ADD COLUMN     "listing_type" TEXT NOT NULL,
ADD COLUMN     "progress" "ProgressStatus" NOT NULL,
ADD COLUMN     "property_title" TEXT NOT NULL,
ADD COLUMN     "property_type" TEXT NOT NULL,
ADD COLUMN     "realtorId" TEXT NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "OfferStatus";

-- AddForeignKey
ALTER TABLE "Offers" ADD CONSTRAINT "Offers_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
