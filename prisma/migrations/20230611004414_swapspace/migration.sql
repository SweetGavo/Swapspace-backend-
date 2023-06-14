/*
  Warnings:

  - You are about to drop the column `comment` on the `Response` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contacts` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_deals` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('Personal', 'Team');

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "comment",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "contacts" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "number_of_deals" INTEGER NOT NULL,
ADD COLUMN     "type" "TYPE" NOT NULL;
