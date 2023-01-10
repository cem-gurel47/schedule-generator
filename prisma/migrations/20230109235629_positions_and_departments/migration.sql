/*
  Warnings:

  - You are about to drop the column `departmentId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `positionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_businessId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_positionId_fkey";

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "departments" TEXT[],
ADD COLUMN     "positions" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "departmentId",
DROP COLUMN "positionId",
ADD COLUMN     "department" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "position" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "Position";
