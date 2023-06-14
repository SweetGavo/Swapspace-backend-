/*
  Warnings:

  - You are about to drop the column `type` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "type";

-- DropEnum
DROP TYPE "TYPEE";
