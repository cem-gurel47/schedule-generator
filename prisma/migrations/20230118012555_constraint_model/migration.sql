-- CreateEnum
CREATE TYPE "CONSTRAINT" AS ENUM ('MIN', 'MAX', 'EXACT');

-- CreateTable
CREATE TABLE "Constraint" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "position" TEXT NOT NULL,
    "type" "CONSTRAINT" NOT NULL,

    CONSTRAINT "Constraint_pkey" PRIMARY KEY ("id")
);
