/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Otp` table. All the data in the column will be lost.
  - Added the required column `otp_expiry` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "expiresAt",
ADD COLUMN     "otp_expiry" TIMESTAMP(3) NOT NULL;
