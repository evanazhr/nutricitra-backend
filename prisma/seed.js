
import { prisma } from '../src/lib/prisma.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
    console.log('Membaca file JSON data master gizi...');

    const filePath = path.join(__dirname, 'food_data_dictionary.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const foodData = JSON.parse(rawData);

    console.log(`emetakan ${foodData.length} data makanan ke skema camelCase...`);

    const bulkDictionaryData = foodData.map((item) => ({
        foodName: item.food_name,
        servingDescription: item.serving_description || null,
        servingSizeG: item.serving_size_g !== undefined && item.serving_size_g !== null ? parseFloat(item.serving_size_g) : null,
        calorie: item.calorie !== undefined && item.calorie !== null ? parseFloat(item.calorie) : 0.0,
        protein: item.protein !== undefined && item.protein !== null ? parseFloat(item.protein) : 0.0,
        fat: item.fat !== undefined && item.fat !== null ? parseFloat(item.fat) : 0.0,
        carbohydrate: item.carbohydrate !== undefined && item.carbohydrate !== null ? parseFloat(item.carbohydrate) : 0.0,

        labelCategory: item.label_category || null,

        water: item.water !== undefined && item.water !== null ? parseFloat(item.water) : (item.air !== undefined && item.air !== null ? parseFloat(item.air) : null),
        fiber: item.fiber !== undefined && item.fiber !== null ? parseFloat(item.fiber) : (item.serat !== undefined && item.serat !== null ? parseFloat(item.serat) : null),
        originRegion: item.origin_region || null,
    }));

    const dataAkg = path.join(__dirname, 'akg_references.json');
    const rawAkgData = fs.readFileSync(dataAkg, 'utf-8');
    const akgData = JSON.parse(rawAkgData);

    const bulkAkgData = akgData.map((item) => ({
        ageLabel: item.ageLabel,
        ageMinMonths: item.ageMinMonths !== undefined && item.ageMinMonths !== null ? parseInt(item.ageMinMonths) : null,
        ageMaxMonths: item.ageMaxMonths !== undefined && item.ageMaxMonths !== null ? parseInt(item.ageMaxMonths) : null,
        gender: item.gender !== undefined && item.gender !== null ? parseInt(item.gender) : null,
        pregnancyTrimester1: item.pregnancyTrimester1 !== undefined && item.pregnancyTrimester1 !== null ? parseInt(item.pregnancyTrimester1) : null,
        pregnancyTrimester2: item.pregnancyTrimester2 !== undefined && item.pregnancyTrimester2 !== null ? parseInt(item.pregnancyTrimester2) : null,
        pregnancyTrimester3: item.pregnancyTrimester3 !== undefined && item.pregnancyTrimester3 !== null ? parseInt(item.pregnancyTrimester3) : null,
        breastfeedingFirst6m: item.breastfeedingFirst6m !== undefined && item.breastfeedingFirst6m !== null ? parseInt(item.breastfeedingFirst6m) : null,
        breastfeedingSecond6m: item.breastfeedingSecond6m !== undefined && item.breastfeedingSecond6m !== null ? parseInt(item.breastfeedingSecond6m) : null,
        calories: item.calories !== undefined && item.calories !== null ? parseFloat(item.calories) : null,
        protein: item.protein !== undefined && item.protein !== null ? parseFloat(item.protein) : null,
        fat: item.fat !== undefined && item.fat !== null ? parseFloat(item.fat) : null,
        carbohydrate: item.carbohydrate !== undefined && item.carbohydrate !== null ? parseFloat(item.carbohydrate) : null,
    }));

    console.log(' Menembak bulk master data ke database Supabase...');
    await prisma.$transaction([
        prisma.foodDictionary.deleteMany({}),
        prisma.akgReference.deleteMany({})
    ]);

    const [foodDictionaryResult, akgReferenceResult] = await Promise.all([
        await prisma.foodDictionary.createMany({
            data: bulkDictionaryData,
        }),
        await prisma.akgReference.createMany({
            data: bulkAkgData,
        })
    ])


    console.log(`==== SEEDING SELESAI ====`);
    console.log(`✅ Sukses memasukkan ${foodDictionaryResult.count} master data kuliner ke tabel food_dictionaries!`);
    console.log(`✅ Sukses memasukkan ${akgReferenceResult.count} master data Akg ke tabel akg_references!`);
}

main()
    .catch((e) => {
        console.error("❌ Proses seeding gagal:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });