/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Update` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `updatePoint` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "List_Types" AS ENUM ('sold', 'sale');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_belongsToId_fkey";

-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_productID_fkey";

-- DropForeignKey
ALTER TABLE "updatePoint" DROP CONSTRAINT "updatePoint_updatedId_fkey";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Update";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "updatePoint";

-- DropEnum
DROP TYPE "UPDATE_STATUS";

-- CreateTable
CREATE TABLE "Agent" (
    "agent_id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "isSubscribed" BOOLEAN NOT NULL,
    "agent_bio_id" TEXT NOT NULL,
    "agent_subscription_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("agent_id")
);

-- CreateTable
CREATE TABLE "Agent_Subscription" (
    "subscription_id" TEXT NOT NULL,
    "name_of_subscription" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "isSubscribed" BOOLEAN NOT NULL,
    "agent_bio_id" TEXT NOT NULL,
    "agent_subscription_id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agent_Subscription_pkey" PRIMARY KEY ("subscription_id")
);

-- CreateTable
CREATE TABLE "AgentBio" (
    "bio_id" TEXT NOT NULL,
    "bio_name" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "AgentBio_pkey" PRIMARY KEY ("bio_id")
);

-- CreateTable
CREATE TABLE "Agent_Listing" (
    "listing_id" TEXT NOT NULL,
    "ratings" TEXT NOT NULL,
    "rating_info" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reported_status" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,

    CONSTRAINT "Agent_Listing_pkey" PRIMARY KEY ("listing_id")
);

-- CreateTable
CREATE TABLE "Agent_Listings" (
    "listing_id" TEXT NOT NULL,
    "listings_type1_id" TEXT NOT NULL,
    "type_of_listing" "List_Types" NOT NULL DEFAULT 'sale',
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT NOT NULL,
    "is_Active" BOOLEAN NOT NULL,

    CONSTRAINT "Agent_Listings_pkey" PRIMARY KEY ("listing_id")
);

-- CreateTable
CREATE TABLE "Agent_Listings_sale" (
    "listing_id" TEXT NOT NULL,
    "listings_type1_id" TEXT NOT NULL,
    "type_of_listing" "List_Types" NOT NULL DEFAULT 'sale',
    "created_by" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT NOT NULL,
    "is_Active" BOOLEAN NOT NULL,

    CONSTRAINT "Agent_Listings_sale_pkey" PRIMARY KEY ("listings_type1_id")
);

-- CreateTable
CREATE TABLE "Agent_Listings_rent" (
    "listing_id" TEXT NOT NULL,
    "listing_type2_id" TEXT NOT NULL,
    "date_created" TEXT NOT NULL,
    "created_by" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT NOT NULL,
    "is_Active" BOOLEAN NOT NULL,

    CONSTRAINT "Agent_Listings_rent_pkey" PRIMARY KEY ("listing_type2_id")
);

-- CreateTable
CREATE TABLE "Agent_BRn" (
    "BRn_id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "date_created" TEXT NOT NULL,
    "created_by" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT NOT NULL,
    "is_Active" BOOLEAN NOT NULL,

    CONSTRAINT "Agent_BRn_pkey" PRIMARY KEY ("BRn_id")
);

-- CreateTable
CREATE TABLE "AgentSpecialties" (
    "specialties_id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_created" TEXT NOT NULL,
    "created_by" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT NOT NULL,
    "is_Active" BOOLEAN NOT NULL,

    CONSTRAINT "AgentSpecialties_pkey" PRIMARY KEY ("specialties_id")
);

-- CreateTable
CREATE TABLE "Agent_ORn" (
    "ORn_id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "date_created" TEXT NOT NULL,
    "created_by" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT NOT NULL,
    "is_Active" BOOLEAN NOT NULL,

    CONSTRAINT "Agent_ORn_pkey" PRIMARY KEY ("ORn_id")
);

-- CreateTable
CREATE TABLE "Agents_Language" (
    "language_id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "date_created" TEXT NOT NULL,
    "created_by" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT NOT NULL,
    "is_Active" BOOLEAN NOT NULL,

    CONSTRAINT "Agents_Language_pkey" PRIMARY KEY ("language_id")
);

-- CreateTable
CREATE TABLE "Agent_About" (
    "about_id" TEXT NOT NULL,
    "bio_id" TEXT NOT NULL,
    "date_created" TEXT NOT NULL,
    "created_by" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT NOT NULL,
    "is_Active" BOOLEAN NOT NULL,

    CONSTRAINT "Agent_About_pkey" PRIMARY KEY ("about_id")
);

-- CreateTable
CREATE TABLE "Agent_Photo" (
    "photo_id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "date_created" TEXT NOT NULL,
    "created_by" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT NOT NULL,
    "is_Active" BOOLEAN NOT NULL,

    CONSTRAINT "Agent_Photo_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "AgentExperience" (
    "years_id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "date_created" TEXT NOT NULL,
    "created_by" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT NOT NULL,
    "is_Active" BOOLEAN NOT NULL,

    CONSTRAINT "AgentExperience_pkey" PRIMARY KEY ("years_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_agent_id_key" ON "Agent"("agent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_name_key" ON "Agent"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_email_key" ON "Agent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_agent_bio_id_key" ON "Agent"("agent_bio_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_agent_subscription_id_key" ON "Agent"("agent_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Subscription_subscription_id_key" ON "Agent_Subscription"("subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Subscription_agent_bio_id_key" ON "Agent_Subscription"("agent_bio_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Subscription_agent_subscription_id_key" ON "Agent_Subscription"("agent_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Subscription_agent_id_key" ON "Agent_Subscription"("agent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Subscription_subscription_id_agent_id_key" ON "Agent_Subscription"("subscription_id", "agent_id");

-- CreateIndex
CREATE UNIQUE INDEX "AgentBio_bio_id_key" ON "AgentBio"("bio_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Listing_listing_id_key" ON "Agent_Listing"("listing_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Listing_agent_id_key" ON "Agent_Listing"("agent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Listing_listing_id_agent_id_key" ON "Agent_Listing"("listing_id", "agent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Listings_listing_id_key" ON "Agent_Listings"("listing_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Listings_listings_type1_id_key" ON "Agent_Listings"("listings_type1_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Listings_sale_listings_type1_id_key" ON "Agent_Listings_sale"("listings_type1_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Listings_rent_listing_type2_id_key" ON "Agent_Listings_rent"("listing_type2_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_BRn_BRn_id_key" ON "Agent_BRn"("BRn_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_BRn_agent_id_key" ON "Agent_BRn"("agent_id");

-- CreateIndex
CREATE UNIQUE INDEX "AgentSpecialties_specialties_id_key" ON "AgentSpecialties"("specialties_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_ORn_ORn_id_key" ON "Agent_ORn"("ORn_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_ORn_ORn_id_agent_id_key" ON "Agent_ORn"("ORn_id", "agent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agents_Language_language_id_key" ON "Agents_Language"("language_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agents_Language_language_id_agent_id_key" ON "Agents_Language"("language_id", "agent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_About_about_id_key" ON "Agent_About"("about_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Photo_photo_id_key" ON "Agent_Photo"("photo_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Photo_photo_id_agent_id_key" ON "Agent_Photo"("photo_id", "agent_id");

-- CreateIndex
CREATE UNIQUE INDEX "AgentExperience_years_id_key" ON "AgentExperience"("years_id");

-- CreateIndex
CREATE UNIQUE INDEX "AgentExperience_years_id_agent_id_key" ON "AgentExperience"("years_id", "agent_id");
