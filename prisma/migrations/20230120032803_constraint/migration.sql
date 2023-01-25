/*
  Warnings:

  - You are about to drop the column `date` on the `Constraint` table. All the data in the column will be lost.
  - Added the required column `dayOfWeek` to the `Constraint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Constraint" DROP COLUMN "date",
ADD COLUMN     "dayOfWeek" INTEGER NOT NULL,
ALTER COLUMN "start" SET DATA TYPE TEXT,
ALTER COLUMN "end" SET DATA TYPE TEXT;
