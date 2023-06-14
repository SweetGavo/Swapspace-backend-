-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "view_by_user" TEXT[],
ADD COLUMN     "view_count" INTEGER NOT NULL DEFAULT 0;
