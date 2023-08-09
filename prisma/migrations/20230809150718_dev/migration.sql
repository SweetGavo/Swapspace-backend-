/*
  Warnings:

  - You are about to drop the column `realtorId` on the `Invitation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_realtorId_fkey";

-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "realtorId",
ADD COLUMN     "agentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
