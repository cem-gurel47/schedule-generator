/*
  Warnings:

  - Added the required column `constraint` to the `Constraint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Constraint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Constraint" ADD COLUMN     "constraint" INTEGER NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL;
