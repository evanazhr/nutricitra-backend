/*
  Warnings:

  - You are about to drop the column `fatsecret_url` on the `food_dictionaries` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `food_dictionaries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "food_dictionaries" DROP COLUMN "fatsecret_url",
DROP COLUMN "source";
