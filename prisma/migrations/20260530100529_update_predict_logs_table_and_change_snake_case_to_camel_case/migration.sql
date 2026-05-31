/*
  Warnings:

  - You are about to drop the column `createdAt` on the `authentications` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `authentications` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `authentications` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `mealType` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `predictLogId` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `predict_logs` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `predict_logs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `predict_logs` table. All the data in the column will be lost.
  - You are about to drop the column `calorieTarget` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `carbohydrateTarget` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `fatTarget` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `proteinTarget` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `authentications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `authentications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_calorie` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_carbohydrate` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_fat` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_protein` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_calorie` to the `predict_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_carbohydrate` to the `predict_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_fat` to the `predict_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_protein` to the `predict_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `predict_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `predict_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calorie_target` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbohydrate_target` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat_target` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein_target` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "authentications" DROP CONSTRAINT "authentications_userId_fkey";

-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_predictLogId_fkey";

-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_userId_fkey";

-- DropForeignKey
ALTER TABLE "predict_logs" DROP CONSTRAINT "predict_logs_userId_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- DropIndex
DROP INDEX "profiles_userId_key";

-- AlterTable
ALTER TABLE "authentications" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "meals" DROP COLUMN "createdAt",
DROP COLUMN "mealType",
DROP COLUMN "predictLogId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fiber" DOUBLE PRECISION,
ADD COLUMN     "label_category" TEXT,
ADD COLUMN     "meal_type" TEXT,
ADD COLUMN     "origin_region" TEXT,
ADD COLUMN     "predict_log_id" TEXT,
ADD COLUMN     "total_calorie" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_carbohydrate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_fiber" DOUBLE PRECISION,
ADD COLUMN     "total_protein" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_water" DOUBLE PRECISION,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "water" DOUBLE PRECISION,
ALTER COLUMN "image_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "predict_logs" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fiber" DOUBLE PRECISION,
ADD COLUMN     "label_category" TEXT,
ADD COLUMN     "origin_region" TEXT,
ADD COLUMN     "total_calorie" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_carbohydrate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_fiber" DOUBLE PRECISION,
ADD COLUMN     "total_protein" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_water" DOUBLE PRECISION,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "water" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "calorieTarget",
DROP COLUMN "carbohydrateTarget",
DROP COLUMN "createdAt",
DROP COLUMN "fatTarget",
DROP COLUMN "proteinTarget",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "calorie_target" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "carbohydrate_target" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fat_target" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "protein_target" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatarUrl",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "MealType";

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- AddForeignKey
ALTER TABLE "authentications" ADD CONSTRAINT "authentications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "predict_logs" ADD CONSTRAINT "predict_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_predict_log_id_fkey" FOREIGN KEY ("predict_log_id") REFERENCES "predict_logs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
