-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "serving_description" TEXT,
ADD COLUMN     "serving_size_g" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "predict_logs" ADD COLUMN     "serving_description" TEXT,
ADD COLUMN     "serving_size_g" DOUBLE PRECISION;
