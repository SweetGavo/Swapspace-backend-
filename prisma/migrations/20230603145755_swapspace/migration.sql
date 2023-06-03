/*
  Warnings:

  - You are about to drop the column `criteria` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `deal_objective` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `number_of_deals` on the `Task` table. All the data in the column will be lost.
  - Added the required column `assignee` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collaborator` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Completed_Type" AS ENUM ('PENDING', 'COMPLETED', 'OVERDUE');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "criteria",
DROP COLUMN "deal_objective",
DROP COLUMN "details",
DROP COLUMN "number_of_deals",
ADD COLUMN     "assignee" TEXT NOT NULL,
ADD COLUMN     "collaborator" TEXT NOT NULL,
ADD COLUMN     "completed" "Completed_Type" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "contact" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL;
