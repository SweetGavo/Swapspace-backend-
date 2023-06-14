/*
  Warnings:

  - You are about to drop the column `assignee` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `collaborator` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "assignee",
DROP COLUMN "collaborator",
ADD COLUMN     "assigneeId" TEXT,
ADD COLUMN     "coRealtorId" TEXT,
ADD COLUMN     "collaboratorId" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_coRealtorId_fkey" FOREIGN KEY ("coRealtorId") REFERENCES "CoRealtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "CoRealtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "CoRealtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
