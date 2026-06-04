/*
  Warnings:

  - You are about to drop the column `total_calorie` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `total_carbohydrate` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `total_fat` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `total_fiber` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `total_protein` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `total_water` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `total_calorie` on the `predict_logs` table. All the data in the column will be lost.
  - You are about to drop the column `total_carbohydrate` on the `predict_logs` table. All the data in the column will be lost.
  - You are about to drop the column `total_fat` on the `predict_logs` table. All the data in the column will be lost.
  - You are about to drop the column `total_fiber` on the `predict_logs` table. All the data in the column will be lost.
  - You are about to drop the column `total_protein` on the `predict_logs` table. All the data in the column will be lost.
  - You are about to drop the column `total_water` on the `predict_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "meals" DROP COLUMN "total_calorie",
DROP COLUMN "total_carbohydrate",
DROP COLUMN "total_fat",
DROP COLUMN "total_fiber",
DROP COLUMN "total_protein",
DROP COLUMN "total_water";

-- AlterTable
ALTER TABLE "predict_logs" DROP COLUMN "total_calorie",
DROP COLUMN "total_carbohydrate",
DROP COLUMN "total_fat",
DROP COLUMN "total_fiber",
DROP COLUMN "total_protein",
DROP COLUMN "total_water";
