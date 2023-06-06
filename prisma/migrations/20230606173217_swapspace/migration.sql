/*
  Warnings:

  - Added the required column `otp_expiry` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "otp_expiry" TIMESTAMP(3) NOT NULL;
