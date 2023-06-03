/*
  Warnings:

  - Changed the type of `action` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Action_Type" AS ENUM ('CALL', 'EMAIL', 'MESSAGE', 'DEAL');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "action",
ADD COLUMN     "action" "Action_Type" NOT NULL;
