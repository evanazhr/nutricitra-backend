/*
  Warnings:

  - You are about to drop the column `calorieGoal` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `carbohydrateGoal` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `fatGoal` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `proteinGoal` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `calorieTarget` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbohydrateTarget` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatTarget` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proteinTarget` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "calorieGoal",
DROP COLUMN "carbohydrateGoal",
DROP COLUMN "fatGoal",
DROP COLUMN "proteinGoal",
ADD COLUMN     "calorieTarget" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "carbohydrateTarget" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fatTarget" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "proteinTarget" DOUBLE PRECISION NOT NULL;
