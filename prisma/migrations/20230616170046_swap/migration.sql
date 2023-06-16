-- CreateEnum
CREATE TYPE "PROPERTY_TYPES" AS ENUM ('commercial_Villa', 'offices', 'shops', 'apartment', 'villa', 'town_House', 'pent_House', 'select', 'Apartment_Hotel', 'apartment_Residential', 'warehouse', 'showroom', 'bulk_Unit', 'commercial_Floor', 'residential_Floor', 'land');

-- CreateEnum
CREATE TYPE "Specalty_Type" AS ENUM ('Property_Investment', 'Property_Contractor', 'Leasing_Executive', 'Realtor', 'Property_Consultant', 'Real_Estate_Consultant', 'Property_Manager', 'Real_Estate_Agent', 'Sales_Leasing_Agent', 'Other', 'Selecte');

-- CreateEnum
CREATE TYPE "Status_type" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('USER', 'AGENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "Agent_type" AS ENUM ('REALTOR', 'CO_REALTOR');

-- CreateEnum
CREATE TYPE "Availablity_Type" AS ENUM ('Available', 'Unavailable', 'Sold');

-- CreateEnum
CREATE TYPE "Property_Status" AS ENUM ('Reviwing', 'Live', 'Declined');

-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('Inquiry', 'Negotiation', 'Acceptance', 'Payment', 'Sold');

-- CreateEnum
CREATE TYPE "Completed_Type" AS ENUM ('PENDING', 'COMPLETED', 'OVERDUE');

-- CreateEnum
CREATE TYPE "Action_Type" AS ENUM ('CALL', 'EMAIL', 'MESSAGE', 'DEAL', 'OTHERS');

-- CreateEnum
CREATE TYPE "CoRealtorId" AS ENUM ('CO_REALTOR_1', 'CO_REALTOR_2', 'NONE');

-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('Personal', 'Team');

-- CreateEnum
CREATE TYPE "PAYMENT_PLAN" AS ENUM ('two_Term_Installments', 'one_Term_Payment', 'three_Term_Payment');

-- CreateEnum
CREATE TYPE "SPECIFICATION" AS ENUM ('funished', 'unfunished', 'none');

-- CreateEnum
CREATE TYPE "RENT" AS ENUM ('sale', 'short_let');

-- CreateEnum
CREATE TYPE "STRUCTURE" AS ENUM ('commercial', 'residential');

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
CREATE TYPE "FEEDBACKNATURE" AS ENUM ('SUGGESTION', 'COMPLAINT', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedEmail" BOOLEAN NOT NULL DEFAULT false,
    "verifiedNumber" BOOLEAN NOT NULL DEFAULT false,
    "realtorId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Realtor" (
    "id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "broker_BRN" TEXT NOT NULL,
    "agent_ORN" TEXT NOT NULL,
    "years_of_experience" TEXT NOT NULL,
    "specialty" TEXT[],
    "role" "Agent_type" NOT NULL,
    "language" TEXT[],
    "description" TEXT NOT NULL,
    "license_number" TEXT NOT NULL,
    "broker_card_image" TEXT[],
    "image" TEXT NOT NULL,
    "status" "Status_type" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Realtor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "otp_expiry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "property_title" TEXT NOT NULL,
    "property_type" "PROPERTY_TYPES" NOT NULL,
    "structure" TEXT NOT NULL,
    "listing_type" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "view" TEXT NOT NULL,
    "utility_payment" TEXT NOT NULL,
    "year_built" TEXT NOT NULL,
    "pets_allowed" TEXT NOT NULL,
    "available" TEXT NOT NULL,
    "sale_or_rent_price" TEXT NOT NULL,
    "price_prefix" TEXT NOT NULL,
    "payment_frequency" TEXT NOT NULL,
    "payment_plan" TEXT NOT NULL,
    "langitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "country" TEXT NOT NULL,
    "street_Number" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "logistics" TEXT NOT NULL,
    "parking_lot" TEXT NOT NULL,
    "parking_slots" TEXT NOT NULL,
    "fire_place" TEXT NOT NULL,
    "entry_floor" TEXT NOT NULL,
    "room_list" TEXT NOT NULL,
    "bedroom" TEXT NOT NULL,
    "bathroom" TEXT NOT NULL,
    "pool" TEXT NOT NULL,
    "building_unit" TEXT NOT NULL,
    "unit_amenities" TEXT[],
    "specification" TEXT NOT NULL,
    "images" TEXT[],
    "video_url" TEXT NOT NULL,
    "video_url_tour" TEXT NOT NULL,
    "utilities" TEXT[],
    "date_posted" TEXT NOT NULL,
    "property_price" TEXT NOT NULL,
    "total_lessee" TEXT NOT NULL,
    "renovation" TEXT,
    "permit" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "additional_details" TEXT NOT NULL,
    "additional_facilities_and_amenities" TEXT NOT NULL,
    "proximate_landmark" TEXT NOT NULL,
    "availablity" "Availablity_Type" NOT NULL DEFAULT 'Available',
    "status" "Property_Status" NOT NULL DEFAULT 'Reviwing',
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "view_by_user" TEXT[],
    "realtorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "realtorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offers" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "realtorId" TEXT NOT NULL,
    "listingId" TEXT,
    "client_name" TEXT NOT NULL,
    "property_title" TEXT NOT NULL,
    "property_type" TEXT NOT NULL,
    "listing_type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "progress" "ProgressStatus" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "action" "Action_Type" NOT NULL,
    "coRealtorId" TEXT,
    "number_of_deals" INTEGER NOT NULL,
    "contact" TEXT[],
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "due_time" TIMESTAMP(3) NOT NULL,
    "closing_date" TIMESTAMP(3) NOT NULL,
    "closing_time" TIMESTAMP(3) NOT NULL,
    "completed" "Completed_Type" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "realtorId" TEXT,
    "assigneeId" TEXT,
    "collaboratorId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "contacts" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "taskId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoRealtor" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'CO_REALTOR',
    "token" TEXT,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoRealtor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "realtorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

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
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ROC" (
    "id" TEXT NOT NULL,
    "property_price" DOUBLE PRECISION NOT NULL,
    "commissiom" DOUBLE PRECISION NOT NULL,
    "split" INTEGER NOT NULL,
    "gain" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ROC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
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
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "User"("number");

-- CreateIndex
CREATE UNIQUE INDEX "User_realtorId_key" ON "User"("realtorId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "Profile_userId_idx" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Realtor_id_key" ON "Realtor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Realtor_license_number_key" ON "Realtor"("license_number");

-- CreateIndex
CREATE UNIQUE INDEX "Realtor_userId_key" ON "Realtor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Otp_id_key" ON "Otp"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Otp_userId_key" ON "Otp"("userId");

-- CreateIndex
CREATE INDEX "Otp_userId_idx" ON "Otp"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_id_key" ON "Property"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_id_key" ON "Rating"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Offers_id_key" ON "Offers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_key" ON "Task"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Response_id_key" ON "Response"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CoRealtor_id_key" ON "CoRealtor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CoRealtor_email_key" ON "CoRealtor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CoRealtor_token_key" ON "CoRealtor"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_id_key" ON "Invitation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_email_key" ON "Invitation"("email");

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
CREATE UNIQUE INDEX "ROC_id_key" ON "ROC"("id");

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
ALTER TABLE "_InfoTeams" ADD CONSTRAINT "_InfoTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InfoTeams" ADD CONSTRAINT "_InfoTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorites" ADD CONSTRAINT "_favorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorites" ADD CONSTRAINT "_favorites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
