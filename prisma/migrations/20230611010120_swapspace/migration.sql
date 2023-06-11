/*
  Warnings:

  - You are about to drop the column `assignees` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `collaborators` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "assignees",
DROP COLUMN "collaborators",
ADD COLUMN     "assignee" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "collaborator" TEXT[] DEFAULT ARRAY[]::TEXT[];
