
import {prisma} from '../src/lib/prisma.js';
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
        servingSizeG: item.serving_size_g ? parseFloat(item.serving_size_g) : null,
        calorie: parseFloat(item.calorie) || 0.0,
        protein: parseFloat(item.protein) || 0.0,
        fat: parseFloat(item.fat) || 0.0,
        carbohydrate: parseFloat(item.carbohydrate) || 0.0,

        labelCategory: item.label_category || null,

        water: item.water ? parseFloat(item.water) : (item.air ? parseFloat(item.air) : null),
        fiber: item.fiber ? parseFloat(item.fiber) : (item.serat ? parseFloat(item.serat) : null),
        originRegion: item.origin_region || null,
    }));

    console.log(' Menembak bulk master data ke database Supabase...');

    const result = await prisma.foodDictionary.createMany({
        data: bulkDictionaryData,
        skipDuplicates: true,
    });

    console.log(`==== SEEDING SELESAI ====`);
    console.log(`✅ Sukses memasukkan ${result.count} master data kuliner ke tabel food_dictionaries!`);
}

main()
    .catch((e) => {
        console.error("❌ Proses seeding gagal:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });