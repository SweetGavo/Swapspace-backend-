-- CreateEnum
CREATE TYPE "PROPERTY_TYPES" AS ENUM ('commercial_Villa', 'offices', 'shops', 'apartment', 'villa', 'town_House', 'pent_House', 'select', 'Apartment_Hotel', 'apartment_Residential', 'warehouse', 'showroom', 'bulk_Unit', 'commercial_Floor', 'residential_Floor', 'land');

-- CreateEnum
CREATE TYPE "Location_Type" AS ENUM ('langitude', 'latitude', 'country', 'street_Number', 'locality', 'postal_code');

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "property_title" TEXT NOT NULL,
    "property_type" "PROPERTY_TYPES" NOT NULL DEFAULT 'select',
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
    "location" "Location_Type" NOT NULL,
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
    "permit" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "additional_details" TEXT NOT NULL,
    "additional_facilities_and_amenities" TEXT NOT NULL,
    "proximate_landmark" TEXT NOT NULL,
    "realtorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_id_key" ON "Property"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Property_realtorId_key" ON "Property"("realtorId");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
