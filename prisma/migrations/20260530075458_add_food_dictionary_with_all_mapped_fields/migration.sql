/*
  Warnings:

  - Made the column `image_url` on table `meals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "meals" ALTER COLUMN "image_url" SET NOT NULL;

-- CreateTable
CREATE TABLE "food_dictionaries" (
    "id" TEXT NOT NULL,
    "food_name" TEXT NOT NULL,
    "serving_description" TEXT,
    "serving_size_g" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION NOT NULL,
    "calorie" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbohydrate" DOUBLE PRECISION NOT NULL,
    "source" TEXT,
    "fatsecret_url" TEXT,
    "water" DOUBLE PRECISION,
    "fiber" DOUBLE PRECISION,
    "label_category" TEXT,
    "origin_region" TEXT,

    CONSTRAINT "food_dictionaries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "food_dictionaries_food_name_key" ON "food_dictionaries"("food_name");
