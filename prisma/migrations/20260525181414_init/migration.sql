/*
  Warnings:

  - Added the required column `calorieGoal` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbohydrateGoal` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatGoal` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proteinGoal` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "calorieGoal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "carbohydrateGoal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fatGoal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "proteinGoal" DOUBLE PRECISION NOT NULL;
