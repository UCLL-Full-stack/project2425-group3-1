/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "scheduleId";

-- CreateTable
CREATE TABLE "_WorkoutSchedules" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_WorkoutSchedules_AB_unique" ON "_WorkoutSchedules"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkoutSchedules_B_index" ON "_WorkoutSchedules"("B");

-- AddForeignKey
ALTER TABLE "_WorkoutSchedules" ADD CONSTRAINT "_WorkoutSchedules_A_fkey" FOREIGN KEY ("A") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutSchedules" ADD CONSTRAINT "_WorkoutSchedules_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
