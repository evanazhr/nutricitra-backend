-- CreateTable
CREATE TABLE "akg_references" (
    "id" SERIAL NOT NULL,
    "ageLabel" TEXT NOT NULL,
    "usia_min_bulan" INTEGER NOT NULL,
    "usia_max_bulan" INTEGER NOT NULL,
    "gender" INTEGER NOT NULL,
    "hamil_1_13" INTEGER NOT NULL,
    "hamil_14_27" INTEGER NOT NULL,
    "hamil_28_41" INTEGER NOT NULL,
    "menyusui_6bl_pertama" INTEGER NOT NULL,
    "menyusui_6bl_kedua" INTEGER NOT NULL,
    "energi_kkal" INTEGER NOT NULL,
    "protein_g" DOUBLE PRECISION NOT NULL,
    "lemak_total_g" DOUBLE PRECISION NOT NULL,
    "karbohidrat_g" INTEGER NOT NULL,

    CONSTRAINT "akg_references_pkey" PRIMARY KEY ("id")
);
