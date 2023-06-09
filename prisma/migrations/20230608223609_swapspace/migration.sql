-- CreateTable
CREATE TABLE "_TaskCoRealtors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskCoRealtors_AB_unique" ON "_TaskCoRealtors"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskCoRealtors_B_index" ON "_TaskCoRealtors"("B");

-- AddForeignKey
ALTER TABLE "_TaskCoRealtors" ADD CONSTRAINT "_TaskCoRealtors_A_fkey" FOREIGN KEY ("A") REFERENCES "CoRealtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskCoRealtors" ADD CONSTRAINT "_TaskCoRealtors_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
