/*
  Warnings:

  - You are about to drop the column `workingHours` on the `Business` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "workingHours",
ADD COLUMN     "closingHours" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "openingHours" TEXT[] DEFAULT ARRAY[]::TEXT[];
