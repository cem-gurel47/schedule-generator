-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "positions" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" TEXT,
ADD COLUMN     "position" TEXT;
