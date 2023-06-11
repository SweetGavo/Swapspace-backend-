/*
  Warnings:

  - You are about to drop the column `coRealtorId` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "coRealtorId",
ADD COLUMN     "assignees" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "collaborators" TEXT[] DEFAULT ARRAY[]::TEXT[];
