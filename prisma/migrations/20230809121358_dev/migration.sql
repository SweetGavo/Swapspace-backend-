/*
  Warnings:

  - You are about to drop the column `userId` on the `Realtor` table. All the data in the column will be lost.
  - You are about to drop the column `realtorId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[agentId]` on the table `Realtor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Realtor" DROP CONSTRAINT "Realtor_userId_fkey";

-- DropIndex
DROP INDEX "Realtor_userId_key";

-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "realtorId" INTEGER;

-- AlterTable
ALTER TABLE "Realtor" DROP COLUMN "userId",
ADD COLUMN     "agentId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "realtorId";

-- CreateIndex
CREATE UNIQUE INDEX "Realtor_agentId_key" ON "Realtor"("agentId");

-- AddForeignKey
ALTER TABLE "Realtor" ADD CONSTRAINT "Realtor_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
