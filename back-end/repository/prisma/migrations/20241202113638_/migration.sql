/*
  Warnings:

  - Added the required column `bmiValue` to the `Bmi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bmi" ADD COLUMN     "bmiValue" DOUBLE PRECISION NOT NULL;
