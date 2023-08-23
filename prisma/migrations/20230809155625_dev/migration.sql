/*
  Warnings:

  - You are about to drop the column `realtorId` on the `Property` table. All the data in the column will be lost.
  - Added the required column `agentId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_realtorId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "realtorId",
ADD COLUMN     "agentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
