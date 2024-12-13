/*
  Warnings:

  - A unique constraint covering the columns `[bmiId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_bmiId_key" ON "User"("bmiId");
