/*
  Warnings:

  - You are about to drop the column `confident_score` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `confident_score` on the `predict_logs` table. All the data in the column will be lost.
  - Added the required column `confidence_score` to the `predict_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meals" DROP COLUMN "confident_score",
ADD COLUMN     "confidence_score" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "predict_logs" DROP COLUMN "confident_score",
ADD COLUMN     "confidence_score" DOUBLE PRECISION NOT NULL;
