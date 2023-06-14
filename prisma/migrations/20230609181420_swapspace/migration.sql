/*
  Warnings:

  - You are about to drop the column `realtorId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `_TaskCoRealtors` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `assignee` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `collaborator` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "_TaskCoRealtors" DROP CONSTRAINT "_TaskCoRealtors_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskCoRealtors" DROP CONSTRAINT "_TaskCoRealtors_B_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "realtorId",
ALTER COLUMN "assignee" SET NOT NULL,
ALTER COLUMN "collaborator" SET NOT NULL;

-- DropTable
DROP TABLE "_TaskCoRealtors";
