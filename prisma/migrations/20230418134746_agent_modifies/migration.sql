/*
  Warnings:

  - A unique constraint covering the columns `[specialties_id,agent_id]` on the table `AgentSpecialties` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[BRn_id,agent_id]` on the table `Agent_BRn` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[listing_id,listing_type2_id]` on the table `Agent_Listings_rent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[listing_id,listings_type1_id]` on the table `Agent_Listings_sale` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AgentSpecialties_specialties_id_agent_id_key" ON "AgentSpecialties"("specialties_id", "agent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_BRn_BRn_id_agent_id_key" ON "Agent_BRn"("BRn_id", "agent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Listings_rent_listing_id_listing_type2_id_key" ON "Agent_Listings_rent"("listing_id", "listing_type2_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_Listings_sale_listing_id_listings_type1_id_key" ON "Agent_Listings_sale"("listing_id", "listings_type1_id");
