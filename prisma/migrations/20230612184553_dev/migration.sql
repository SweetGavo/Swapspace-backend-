/*
  Warnings:

  - The `teamId` column on the `Info` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `time` on the `Info` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Info" DROP COLUMN "time",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL,
DROP COLUMN "teamId",
ADD COLUMN     "teamId" TEXT[];
