-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "departments" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "workingHours" TEXT[] DEFAULT ARRAY[]::TEXT[];
