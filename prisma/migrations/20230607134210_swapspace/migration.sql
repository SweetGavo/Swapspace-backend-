/*
  Warnings:

  - You are about to drop the column `role` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "role",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'ADMIN';
