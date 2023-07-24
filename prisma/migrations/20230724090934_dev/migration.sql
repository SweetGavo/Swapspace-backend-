/*
  Warnings:

  - The primary key for the `CoRealtor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CoRealtor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Favorite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Feedback` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Invitation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Invitation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `realtorId` column on the `Invitation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Offers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Offers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Otp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Otp` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Property` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `realtorId` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PropertyForm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PropertyForm` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `realtorId` column on the `PropertyForm` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ROC` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ROC` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Rating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Rating` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Realtor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Realtor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `Realtor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Response` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Response` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `coRealtorId` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `realtorId` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `assigneeId` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `collaboratorId` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `realtorId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Waitlist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Waitlist` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `userId` on the `Favorite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `propertyId` on the `Favorite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `realtorId` on the `Info` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `propertyId` on the `Offers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `realtorId` on the `Offers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Otp` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `PropertyForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Rating` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `realtorId` on the `Rating` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `taskId` on the `Response` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `realtorId` on the `Team` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `realtorId` on the `TeamTask` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_GroupMembers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_GroupMembers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_InfoTeams` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_favorites` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_favorites` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Info" DROP CONSTRAINT "Info_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "Offers" DROP CONSTRAINT "Offers_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Offers" DROP CONSTRAINT "Offers_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "Otp" DROP CONSTRAINT "Otp_userId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropForeignKey
ALTER TABLE "Realtor" DROP CONSTRAINT "Realtor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_coRealtorId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_collaboratorId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "TeamTask" DROP CONSTRAINT "TeamTask_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "_GroupMembers" DROP CONSTRAINT "_GroupMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupMembers" DROP CONSTRAINT "_GroupMembers_B_fkey";

-- DropForeignKey
ALTER TABLE "_InfoTeams" DROP CONSTRAINT "_InfoTeams_B_fkey";

-- DropForeignKey
ALTER TABLE "_favorites" DROP CONSTRAINT "_favorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_favorites" DROP CONSTRAINT "_favorites_B_fkey";

-- DropIndex
DROP INDEX "CoRealtor_id_key";

-- DropIndex
DROP INDEX "Feedback_id_key";

-- DropIndex
DROP INDEX "Invitation_id_key";

-- DropIndex
DROP INDEX "Offers_id_key";

-- DropIndex
DROP INDEX "Otp_id_key";

-- DropIndex
DROP INDEX "Profile_id_key";

-- DropIndex
DROP INDEX "Property_id_key";

-- DropIndex
DROP INDEX "PropertyForm_id_key";

-- DropIndex
DROP INDEX "ROC_id_key";

-- DropIndex
DROP INDEX "Rating_id_key";

-- DropIndex
DROP INDEX "Realtor_id_key";

-- DropIndex
DROP INDEX "Response_id_key";

-- DropIndex
DROP INDEX "Task_id_key";

-- DropIndex
DROP INDEX "Team_id_key";

-- DropIndex
DROP INDEX "User_id_key";

-- DropIndex
DROP INDEX "Waitlist_id_key";

-- AlterTable
ALTER TABLE "CoRealtor" DROP CONSTRAINT "CoRealtor_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CoRealtor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "propertyId",
ADD COLUMN     "propertyId" INTEGER NOT NULL,
ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Info" DROP COLUMN "realtorId",
ADD COLUMN     "realtorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "realtorId",
ADD COLUMN     "realtorId" INTEGER,
ADD CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Offers" DROP CONSTRAINT "Offers_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "propertyId",
ADD COLUMN     "propertyId" INTEGER NOT NULL,
DROP COLUMN "realtorId",
ADD COLUMN     "realtorId" INTEGER NOT NULL,
ADD CONSTRAINT "Offers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Otp" DROP CONSTRAINT "Otp_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Otp_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Property" DROP CONSTRAINT "Property_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "realtorId",
ADD COLUMN     "realtorId" INTEGER,
ADD CONSTRAINT "Property_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PropertyForm" DROP CONSTRAINT "PropertyForm_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "realtorId",
ADD COLUMN     "realtorId" INTEGER,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "PropertyForm_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ROC" DROP CONSTRAINT "ROC_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ROC_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "realtorId",
ADD COLUMN     "realtorId" INTEGER NOT NULL,
ADD CONSTRAINT "Rating_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Realtor" DROP CONSTRAINT "Realtor_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "Realtor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Response" DROP CONSTRAINT "Response_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "taskId",
ADD COLUMN     "taskId" INTEGER NOT NULL,
ADD CONSTRAINT "Response_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "coRealtorId",
ADD COLUMN     "coRealtorId" INTEGER,
DROP COLUMN "realtorId",
ADD COLUMN     "realtorId" INTEGER,
DROP COLUMN "assigneeId",
ADD COLUMN     "assigneeId" INTEGER,
DROP COLUMN "collaboratorId",
ADD COLUMN     "collaboratorId" INTEGER,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "realtorId",
ADD COLUMN     "realtorId" INTEGER NOT NULL,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TeamTask" DROP COLUMN "realtorId",
ADD COLUMN     "realtorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "realtorId",
ADD COLUMN     "realtorId" INTEGER,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Waitlist" DROP CONSTRAINT "Waitlist_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_GroupMembers" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_InfoTeams" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_favorites" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Otp_userId_idx" ON "Otp"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "Profile_userId_idx" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Realtor_userId_key" ON "Realtor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_realtorId_key" ON "User"("realtorId");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupMembers_AB_unique" ON "_GroupMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupMembers_B_index" ON "_GroupMembers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InfoTeams_AB_unique" ON "_InfoTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_InfoTeams_B_index" ON "_InfoTeams"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_favorites_AB_unique" ON "_favorites"("A", "B");

-- CreateIndex
CREATE INDEX "_favorites_B_index" ON "_favorites"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Realtor" ADD CONSTRAINT "Realtor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offers" ADD CONSTRAINT "Offers_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offers" ADD CONSTRAINT "Offers_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_coRealtorId_fkey" FOREIGN KEY ("coRealtorId") REFERENCES "CoRealtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "CoRealtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "CoRealtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTask" ADD CONSTRAINT "TeamTask_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Info" ADD CONSTRAINT "Info_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupMembers" ADD CONSTRAINT "_GroupMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "CoRealtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupMembers" ADD CONSTRAINT "_GroupMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InfoTeams" ADD CONSTRAINT "_InfoTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorites" ADD CONSTRAINT "_favorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorites" ADD CONSTRAINT "_favorites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
