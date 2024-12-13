-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bmiId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bmiId_fkey" FOREIGN KEY ("bmiId") REFERENCES "Bmi"("id") ON DELETE SET NULL ON UPDATE CASCADE;
