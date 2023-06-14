/*
  Warnings:

  - You are about to drop the column `address` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `property_name` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `property_type` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Invitation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Offers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Offers` table. All the data in the column will be lost.
  - You are about to drop the column `compant_name` on the `Realtor` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `assignee` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `closing_date_and_time` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `collaborator` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `due_date_and_time` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `declined` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `propertyId` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_name` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listing_type` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_title` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_type` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realtorId` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_name` to the `Realtor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contacts` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closing_date` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closing_time` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_time` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_deals` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Availablity_Type" AS ENUM ('Available', 'Unavailable', 'Sold');

-- CreateEnum
CREATE TYPE "Property_Status" AS ENUM ('Reviwing', 'Live', 'Declined');

-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('Inquiry', 'Negotiation', 'Acceptance', 'Payment', 'Sold');

-- CreateEnum
CREATE TYPE "CoRealtorId" AS ENUM ('CO_REALTOR_1', 'CO_REALTOR_2', 'NONE');

-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('Personal', 'Team');

-- CreateEnum
CREATE TYPE "STRUCTURE" AS ENUM ('commercial', 'residential');

-- CreateEnum
CREATE TYPE "PAYMENT_PLAN" AS ENUM ('one_term_payment', 'three_term_payment');

-- CreateEnum
CREATE TYPE "SPECIFICATION" AS ENUM ('funished', 'unfunished', 'none');

-- CreateEnum
CREATE TYPE "APPLAINCES" AS ENUM ('washing_machine', 'vacuum_cleaner', 'microwave', 'refrigerator', 'air_conditioner', 'kitchen_hood', 'gas_cooker', 'dish_washer', 'oven', 'blender', 'cloth_dryer', 'television', 'light_bulb', 'lamp');

-- CreateEnum
CREATE TYPE "CATEGORY" AS ENUM ('betes_and_bounds', 'lots_and_blocks', 'modern', 'ultra_modern', 'luxury');

-- CreateEnum
CREATE TYPE "AMENITIES" AS ENUM ('swimming_pool', 'fitnes_facilities', 'park_areas', 'apa', 'healt_club', 'co_working_areas', 'sport_and_leisure', 'gardens', 'movies', 'lobby', 'kids_play_area');

-- CreateEnum
CREATE TYPE "EMIRATE" AS ENUM ('abu_dhabi', 'dubai', 'sharja', 'ajman', 'ummu_al_quwain', 'ras_al_khaimah', 'fujairah');

-- CreateEnum
CREATE TYPE "PROXIMITY" AS ENUM ('school', 'hospital', 'salon', 'gas_station', 'airport', 'pharmacy', 'super_maket', 'eats_and_chill', 'bank');

-- CreateEnum
CREATE TYPE "View" AS ENUM ('loft', 'upper_crest', 'fountain_view', 'classic_villa', 'modern_villa', 'black_rock');

-- CreateEnum
CREATE TYPE "PET" AS ENUM ('cat', 'dog', 'none');

-- CreateEnum
CREATE TYPE "STYLE" AS ENUM ('arabic_villa', 'palm_jumeirah', 'modern_mansion', 'classic_villa', 'modern_villa', 'black_rock');

-- CreateEnum
CREATE TYPE "RENT" AS ENUM ('sale', 'short_let');

-- CreateEnum
CREATE TYPE "FEEDBACKNATURE" AS ENUM ('SUGGESTION', 'COMPLAINT', 'OTHER');

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "Offers" DROP CONSTRAINT "Offers_userId_fkey";

-- DropForeignKey
ALTER TABLE "_GroupMembers" DROP CONSTRAINT "_GroupMembers_B_fkey";

-- DropIndex
DROP INDEX "Favorite_id_key";

-- DropIndex
DROP INDEX "Invitation_token_key";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "address",
DROP COLUMN "description",
DROP COLUMN "property_name",
DROP COLUMN "property_type",
ADD COLUMN     "propertyId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "token";

-- AlterTable
ALTER TABLE "Offers" DROP COLUMN "status",
DROP COLUMN "userId",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "client_name" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "listingId" TEXT,
ADD COLUMN     "listing_type" TEXT NOT NULL,
ADD COLUMN     "progress" "ProgressStatus" NOT NULL,
ADD COLUMN     "property_title" TEXT NOT NULL,
ADD COLUMN     "property_type" TEXT NOT NULL,
ADD COLUMN     "realtorId" TEXT NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "otp_expiry" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "availablity" "Availablity_Type" NOT NULL DEFAULT 'Available',
ADD COLUMN     "status" "Property_Status" NOT NULL DEFAULT 'Reviwing',
ADD COLUMN     "view_by_user" TEXT[],
ADD COLUMN     "view_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Realtor" DROP COLUMN "compant_name",
ADD COLUMN     "company_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "comment",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "contacts" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "assignee",
DROP COLUMN "closing_date_and_time",
DROP COLUMN "collaborator",
DROP COLUMN "due_date_and_time",
ADD COLUMN     "assigneeId" TEXT,
ADD COLUMN     "closing_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "closing_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "coRealtorId" TEXT,
ADD COLUMN     "collaboratorId" TEXT,
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "due_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "number_of_deals" INTEGER NOT NULL,
ADD COLUMN     "realtorId" TEXT;

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "declined";

-- DropEnum
DROP TYPE "OfferStatus";

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "realtorId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CREATOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyForm" (
    "id" TEXT NOT NULL,
    "property_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rent" "RENT" NOT NULL,
    "property_type" "PROPERTY_TYPES" NOT NULL,
    "structure" "STRUCTURE" NOT NULL,
    "sale_or_rent_price" TEXT NOT NULL,
    "price_prefix" TEXT NOT NULL,
    "payment_frequency" TEXT NOT NULL,
    "payment_plan" "PAYMENT_PLAN" NOT NULL,
    "images" TEXT[],
    "video_url" TEXT NOT NULL,
    "video_url_tour" TEXT NOT NULL,
    "bedroom" TEXT NOT NULL,
    "bathroom" TEXT NOT NULL,
    "area_size" TEXT NOT NULL,
    "size_postfix" TEXT NOT NULL,
    "fire_place" TEXT NOT NULL,
    "entry_floor" TEXT NOT NULL,
    "parking_slot" TEXT NOT NULL,
    "parking_lot" TEXT NOT NULL,
    "year_built" TEXT NOT NULL,
    "building_unit" TEXT NOT NULL,
    "available" TEXT NOT NULL,
    "renovation" TEXT NOT NULL,
    "appliance" "APPLAINCES" NOT NULL,
    "category" "CATEGORY" NOT NULL,
    "amenities" "AMENITIES" NOT NULL,
    "additional_details" TEXT,
    "location" TEXT NOT NULL,
    "emirate" "EMIRATE" NOT NULL,
    "proximity" "PROXIMITY" NOT NULL,
    "street_Number" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "style" "STYLE" NOT NULL,
    "view" "View" NOT NULL,
    "pet" "PET" NOT NULL,
    "specification" "SPECIFICATION" NOT NULL,
    "floor_plan" TEXT NOT NULL,
    "property_document" TEXT[],
    "total_lessee" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "realtorId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PropertyForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamTask" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT,
    "clue" TEXT NOT NULL,
    "break_down" TEXT[],
    "teamId" TEXT[],
    "contact" TEXT,
    "due_date" TEXT NOT NULL,
    "due_time" TEXT NOT NULL,
    "realtorId" TEXT NOT NULL,
    "status" "Completed_Type" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Info" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "event_link" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "teamId" TEXT[],
    "realtorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nature" "FEEDBACKNATURE" NOT NULL,
    "contact_email" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "feedback_string" TEXT NOT NULL,
    "attachments" JSONB[],

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InfoTeams" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_favorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_key" ON "Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyForm_id_key" ON "PropertyForm"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamTask_id_key" ON "TeamTask"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Info_id_key" ON "Info"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_id_key" ON "Feedback"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_InfoTeams_AB_unique" ON "_InfoTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_InfoTeams_B_index" ON "_InfoTeams"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_favorites_AB_unique" ON "_favorites"("A", "B");

-- CreateIndex
CREATE INDEX "_favorites_B_index" ON "_favorites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_email_key" ON "Invitation"("email");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offers" ADD CONSTRAINT "Offers_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_coRealtorId_fkey" FOREIGN KEY ("coRealtorId") REFERENCES "CoRealtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "CoRealtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "CoRealtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTask" ADD CONSTRAINT "TeamTask_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Info" ADD CONSTRAINT "Info_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupMembers" ADD CONSTRAINT "_GroupMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InfoTeams" ADD CONSTRAINT "_InfoTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InfoTeams" ADD CONSTRAINT "_InfoTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorites" ADD CONSTRAINT "_favorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorites" ADD CONSTRAINT "_favorites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
