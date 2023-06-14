/*
  Warnings:

  - You are about to drop the column `number` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[realtorId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Specalty_Type" AS ENUM ('Property_Investment', 'Property_Contractor', 'Leasing_Executive', 'Realtor', 'Property_Consultant', 'Real_Estate_Consultant', 'Property_Manager', 'Real_Estate_Agent', 'Sales_Leasing_Agent', 'Other');

-- CreateEnum
CREATE TYPE "Status_type" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Agent_type" AS ENUM ('REALTOR', 'CO_REALTOR');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "number";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "realtorId" TEXT;

-- CreateTable
CREATE TABLE "Realtor" (
    "id" TEXT NOT NULL,
    "compant_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "broker_BRN" TEXT NOT NULL,
    "agent_ORN" TEXT NOT NULL,
    "years_of_experience" TEXT NOT NULL,
    "specialty" "Specalty_Type" NOT NULL,
    "role" "Agent_type" NOT NULL,
    "language" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "license_number" TEXT NOT NULL,
    "broker_card_image" TEXT[],
    "status" "Status_type" NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Realtor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Realtor_id_key" ON "Realtor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Realtor_userId_key" ON "Realtor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_realtorId_key" ON "User"("realtorId");

-- AddForeignKey
ALTER TABLE "Realtor" ADD CONSTRAINT "Realtor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
