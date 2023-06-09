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

-- CreateIndex
CREATE UNIQUE INDEX "PropertyForm_id_key" ON "PropertyForm"("id");
