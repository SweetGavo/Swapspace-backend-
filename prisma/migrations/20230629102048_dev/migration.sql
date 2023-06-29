/*
  Warnings:

  - The values [swimming_pool,fitnes_facilities,park_areas,apa,healt_club,co_working_areas,sport_and_leisure,gardens,movies,lobby,kids_play_area] on the enum `AMENITIES` will be removed. If these variants are still used in the database, this will fail.
  - The values [washing_machine,vacuum_cleaner,microwave,refrigerator,air_conditioner,kitchen_hood,gas_cooker,dish_washer,oven,blender,cloth_dryer,television,light_bulb,lamp] on the enum `APPLAINCES` will be removed. If these variants are still used in the database, this will fail.
  - The values [Available,Unavailable,Sold] on the enum `Availablity_Type` will be removed. If these variants are still used in the database, this will fail.
  - The values [betes_and_bounds,lots_and_blocks,modern,ultra_modern,luxury] on the enum `CATEGORY` will be removed. If these variants are still used in the database, this will fail.
  - The values [abu_dhabi,dubai,sharja,ajman,ummu_al_quwain,ras_al_khaimah,fujairah] on the enum `EMIRATE` will be removed. If these variants are still used in the database, this will fail.
  - The values [two_Term_Installments,one_Term_Payment,three_Term_Payment] on the enum `PAYMENT_PLAN` will be removed. If these variants are still used in the database, this will fail.
  - The values [cat,dog,none] on the enum `PET` will be removed. If these variants are still used in the database, this will fail.
  - The values [commercial_Villa,offices,shops,apartment,villa,town_House,pent_House,select,Apartment_Hotel,apartment_Residential,warehouse,showroom,bulk_Unit,commercial_Floor,residential_Floor,land] on the enum `PROPERTY_TYPES` will be removed. If these variants are still used in the database, this will fail.
  - The values [school,hospital,salon,gas_station,airport,pharmacy,super_maket,eats_and_chill,bank] on the enum `PROXIMITY` will be removed. If these variants are still used in the database, this will fail.
  - The values [Inquiry,Negotiation,Acceptance,Payment,Sold] on the enum `ProgressStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Reviwing,Live,Declined] on the enum `Property_Status` will be removed. If these variants are still used in the database, this will fail.
  - The values [sale,short_let] on the enum `RENT` will be removed. If these variants are still used in the database, this will fail.
  - The values [funished,unfunished,none] on the enum `SPECIFICATION` will be removed. If these variants are still used in the database, this will fail.
  - The values [commercial,residential] on the enum `STRUCTURE` will be removed. If these variants are still used in the database, this will fail.
  - The values [arabic_villa,palm_jumeirah,modern_mansion,classic_villa,modern_villa,black_rock] on the enum `STYLE` will be removed. If these variants are still used in the database, this will fail.
  - The values [Personal,Team] on the enum `TYPE` will be removed. If these variants are still used in the database, this will fail.
  - The values [loft,upper_crest,fountain_view,classic_villa,modern_villa,black_rock] on the enum `View` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AMENITIES_new" AS ENUM ('SWIMMING_POOL', 'FITNES_FACILITIES', 'PARK_AREAS', 'APA', 'HEALT_CLUB', 'CO_WORKING_AREAS', 'SPORT_AND_LEISURE', 'GARDENS', 'MOVIES', 'LOBBY', 'KIDS_PLAY_AREA');
ALTER TABLE "PropertyForm" ALTER COLUMN "amenities" TYPE "AMENITIES_new" USING ("amenities"::text::"AMENITIES_new");
ALTER TYPE "AMENITIES" RENAME TO "AMENITIES_old";
ALTER TYPE "AMENITIES_new" RENAME TO "AMENITIES";
DROP TYPE "AMENITIES_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "APPLAINCES_new" AS ENUM ('WASHING_MACHINE', 'VACUUM_CLEANER', 'MICROWAVE', 'REFRIGERATOR', 'AIR_CONDITIONER', 'KITCHEN_HOOD', 'GAS_COOKER', 'DISH_WASHER', 'OVEN', 'BLENDER', 'CLOTH_DRYER', 'TELEVISION', 'LIGHT_BULB', 'LAMP');
ALTER TABLE "PropertyForm" ALTER COLUMN "appliance" TYPE "APPLAINCES_new" USING ("appliance"::text::"APPLAINCES_new");
ALTER TYPE "APPLAINCES" RENAME TO "APPLAINCES_old";
ALTER TYPE "APPLAINCES_new" RENAME TO "APPLAINCES";
DROP TYPE "APPLAINCES_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Availablity_Type_new" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'SOLD');
ALTER TABLE "Property" ALTER COLUMN "availablity" DROP DEFAULT;
ALTER TABLE "Property" ALTER COLUMN "availablity" TYPE "Availablity_Type_new" USING ("availablity"::text::"Availablity_Type_new");
ALTER TYPE "Availablity_Type" RENAME TO "Availablity_Type_old";
ALTER TYPE "Availablity_Type_new" RENAME TO "Availablity_Type";
DROP TYPE "Availablity_Type_old";
ALTER TABLE "Property" ALTER COLUMN "availablity" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "CATEGORY_new" AS ENUM ('BETES_AND_BOUNDS', 'LOTS_AND_BLOCKS', 'MODERN', 'ULTRA_MODERN', 'LUXURY');
ALTER TABLE "PropertyForm" ALTER COLUMN "category" TYPE "CATEGORY_new" USING ("category"::text::"CATEGORY_new");
ALTER TYPE "CATEGORY" RENAME TO "CATEGORY_old";
ALTER TYPE "CATEGORY_new" RENAME TO "CATEGORY";
DROP TYPE "CATEGORY_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EMIRATE_new" AS ENUM ('ABU_DHABI', 'DUBAI', 'SHARJA', 'AJMAN', 'UMMU_AL_QUWAIN', 'RAS_AL_KHAIMAH', 'FUJAIRAH');
ALTER TABLE "PropertyForm" ALTER COLUMN "emirate" TYPE "EMIRATE_new" USING ("emirate"::text::"EMIRATE_new");
ALTER TYPE "EMIRATE" RENAME TO "EMIRATE_old";
ALTER TYPE "EMIRATE_new" RENAME TO "EMIRATE";
DROP TYPE "EMIRATE_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PAYMENT_PLAN_new" AS ENUM ('TWO_TERM_INSTALLMENTS', 'ONE_TERM_PAYMENT', 'THREE_TERM_PAYMENT');
ALTER TABLE "PropertyForm" ALTER COLUMN "payment_plan" TYPE "PAYMENT_PLAN_new" USING ("payment_plan"::text::"PAYMENT_PLAN_new");
ALTER TYPE "PAYMENT_PLAN" RENAME TO "PAYMENT_PLAN_old";
ALTER TYPE "PAYMENT_PLAN_new" RENAME TO "PAYMENT_PLAN";
DROP TYPE "PAYMENT_PLAN_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PET_new" AS ENUM ('CAT', 'DOG', 'NONE');
ALTER TABLE "PropertyForm" ALTER COLUMN "pet" TYPE "PET_new" USING ("pet"::text::"PET_new");
ALTER TYPE "PET" RENAME TO "PET_old";
ALTER TYPE "PET_new" RENAME TO "PET";
DROP TYPE "PET_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PROPERTY_TYPES_new" AS ENUM ('COMMERCIAL_VILLA', 'OFFICES', 'SHOPS', 'APARTMENT', 'VILLA', 'TOWN_HOUSE', 'PENT_HOUSE', 'SELECT', 'APARTMENT_HOTEL', 'APARTMENT_RESIDENTIAL', 'WAREHOUSE', 'SHOWROOM', 'BULK_UNIT', 'COMMERCIAL_FLOOR', 'RESIDENTIAL_FLOOR', 'LAND');
ALTER TABLE "Property" ALTER COLUMN "property_type" TYPE "PROPERTY_TYPES_new" USING ("property_type"::text::"PROPERTY_TYPES_new");
ALTER TABLE "PropertyForm" ALTER COLUMN "property_type" TYPE "PROPERTY_TYPES_new" USING ("property_type"::text::"PROPERTY_TYPES_new");
ALTER TYPE "PROPERTY_TYPES" RENAME TO "PROPERTY_TYPES_old";
ALTER TYPE "PROPERTY_TYPES_new" RENAME TO "PROPERTY_TYPES";
DROP TYPE "PROPERTY_TYPES_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PROXIMITY_new" AS ENUM ('SCHOOL', 'HOSPITAL', 'SALON', 'GAS_STATION', 'AIRPORT', 'PHARMACY', 'SUPER_MAKET', 'EATS_AND_CHILL', 'BANK');
ALTER TABLE "PropertyForm" ALTER COLUMN "proximity" TYPE "PROXIMITY_new" USING ("proximity"::text::"PROXIMITY_new");
ALTER TYPE "PROXIMITY" RENAME TO "PROXIMITY_old";
ALTER TYPE "PROXIMITY_new" RENAME TO "PROXIMITY";
DROP TYPE "PROXIMITY_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ProgressStatus_new" AS ENUM ('INQUIRY', 'NEGOTIATION', 'ACCEPTANCE', 'PAYMENT', 'SOLD');
ALTER TABLE "Offers" ALTER COLUMN "progress" TYPE "ProgressStatus_new" USING ("progress"::text::"ProgressStatus_new");
ALTER TYPE "ProgressStatus" RENAME TO "ProgressStatus_old";
ALTER TYPE "ProgressStatus_new" RENAME TO "ProgressStatus";
DROP TYPE "ProgressStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Property_Status_new" AS ENUM ('REVIWING', 'LIVE', 'DECLINED');
ALTER TABLE "Property" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Property" ALTER COLUMN "status" TYPE "Property_Status_new" USING ("status"::text::"Property_Status_new");
ALTER TYPE "Property_Status" RENAME TO "Property_Status_old";
ALTER TYPE "Property_Status_new" RENAME TO "Property_Status";
DROP TYPE "Property_Status_old";
ALTER TABLE "Property" ALTER COLUMN "status" SET DEFAULT 'REVIWING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "RENT_new" AS ENUM ('SALE', 'SHORT_LET');
ALTER TABLE "PropertyForm" ALTER COLUMN "rent" TYPE "RENT_new" USING ("rent"::text::"RENT_new");
ALTER TYPE "RENT" RENAME TO "RENT_old";
ALTER TYPE "RENT_new" RENAME TO "RENT";
DROP TYPE "RENT_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SPECIFICATION_new" AS ENUM ('FUNISHED', 'UNFUNISHED', 'NONE');
ALTER TABLE "PropertyForm" ALTER COLUMN "specification" TYPE "SPECIFICATION_new" USING ("specification"::text::"SPECIFICATION_new");
ALTER TYPE "SPECIFICATION" RENAME TO "SPECIFICATION_old";
ALTER TYPE "SPECIFICATION_new" RENAME TO "SPECIFICATION";
DROP TYPE "SPECIFICATION_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "STRUCTURE_new" AS ENUM ('COMMERCIAL', 'RESIDENTIAL');
ALTER TABLE "PropertyForm" ALTER COLUMN "structure" TYPE "STRUCTURE_new" USING ("structure"::text::"STRUCTURE_new");
ALTER TYPE "STRUCTURE" RENAME TO "STRUCTURE_old";
ALTER TYPE "STRUCTURE_new" RENAME TO "STRUCTURE";
DROP TYPE "STRUCTURE_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "STYLE_new" AS ENUM ('ARABIC_VILLA', 'PALM_JUMEIRAH', 'MODERN_MANSION', 'CLASSIC_VILLA', 'MODERN_VILLA', 'BLACK_ROCK');
ALTER TABLE "PropertyForm" ALTER COLUMN "style" TYPE "STYLE_new" USING ("style"::text::"STYLE_new");
ALTER TYPE "STYLE" RENAME TO "STYLE_old";
ALTER TYPE "STYLE_new" RENAME TO "STYLE";
DROP TYPE "STYLE_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TYPE_new" AS ENUM ('PERSONAL', 'TEAM');
ALTER TYPE "TYPE" RENAME TO "TYPE_old";
ALTER TYPE "TYPE_new" RENAME TO "TYPE";
DROP TYPE "TYPE_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "View_new" AS ENUM ('LOFT', 'UPPER_CREST', 'FOUNTAIN_VIEW', 'CLASSIC_VILLA', 'MODERN_VILLA', 'BLACK_ROCK');
ALTER TABLE "PropertyForm" ALTER COLUMN "view" TYPE "View_new" USING ("view"::text::"View_new");
ALTER TYPE "View" RENAME TO "View_old";
ALTER TYPE "View_new" RENAME TO "View";
DROP TYPE "View_old";
COMMIT;

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "availablity" SET DEFAULT 'AVAILABLE',
ALTER COLUMN "status" SET DEFAULT 'REVIWING';
