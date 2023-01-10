/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `businessId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT '',
ALTER COLUMN "businessId" SET NOT NULL,
ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "department" SET DEFAULT '',
ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "position" SET DEFAULT '';
