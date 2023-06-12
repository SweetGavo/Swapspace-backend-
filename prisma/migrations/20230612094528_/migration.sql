-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "property_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "property_type" "PROPERTY_TYPES" NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "declined" (
    "id" TEXT NOT NULL,
    "property_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "property_type" "PROPERTY_TYPES" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_id_key" ON "Favorite"("id");

-- CreateIndex
CREATE UNIQUE INDEX "declined_id_key" ON "declined"("id");
