/*
  Warnings:

  - The `images` column on the `PropertyForm` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `broker_card_image` column on the `Realtor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PropertyForm" DROP COLUMN "images",
ADD COLUMN     "images" JSONB,
ALTER COLUMN "total_lessee" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "message" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Realtor" DROP COLUMN "broker_card_image",
ADD COLUMN     "broker_card_image" JSONB;
