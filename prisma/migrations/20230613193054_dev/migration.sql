-- CreateEnum
CREATE TYPE "FEEDBACKNATURE" AS ENUM ('SUGGESTION', 'COMPLAINT', 'OTHER');

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nature" "FEEDBACKNATURE" NOT NULL,
    "contact_email" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "feedback_string" TEXT NOT NULL,
    "attachments" JSONB[],

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_id_key" ON "Feedback"("id");
