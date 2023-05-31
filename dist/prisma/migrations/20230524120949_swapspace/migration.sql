/*
  Warnings:

  - A unique constraint covering the columns `[license_number]` on the table `Realtor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Realtor_license_number_key" ON "Realtor"("license_number");
