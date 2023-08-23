/*
  Warnings:

  - The `view_by_user` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "view_by_user",
ADD COLUMN     "view_by_user" INTEGER[];
