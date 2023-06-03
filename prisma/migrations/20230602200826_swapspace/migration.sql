-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "deal_objective" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "number_of_deals" INTEGER NOT NULL,
    "criteria" TEXT[],
    "details" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "due_date_and_time" TIMESTAMP(3) NOT NULL,
    "closing_date_and_time" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_key" ON "Task"("id");
