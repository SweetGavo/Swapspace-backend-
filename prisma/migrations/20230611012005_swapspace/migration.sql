/*
  Warnings:

  - You are about to drop the `_TaskProperties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TaskProperties" DROP CONSTRAINT "_TaskProperties_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskProperties" DROP CONSTRAINT "_TaskProperties_B_fkey";

-- DropTable
DROP TABLE "_TaskProperties";
