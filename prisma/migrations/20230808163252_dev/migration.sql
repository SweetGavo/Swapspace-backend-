-- CreateTable
CREATE TABLE "Agent" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT,
    "password" TEXT NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'ADMIN',
    "verifiedEmail" BOOLEAN NOT NULL DEFAULT false,
    "verifiedNumber" BOOLEAN NOT NULL DEFAULT false,
    "block" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_email_key" ON "Agent"("email");
