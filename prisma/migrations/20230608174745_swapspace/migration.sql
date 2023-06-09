-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "realtorId" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
