import axios from "axios";
import { supabase } from "../../../lib/supabase-client.js";
import { formatMealResponse } from "../../../utils/index.js";
import response from "../../../utils/response.js";
import MealRepositories from "../repositories/meal-repositories.js";
import NutritionRepositories from "../../nutrition/repositories/nutrition-repositories.js";
import ProfileRepositories from "../../profiles/repositories/profile-repositories.js";
import InvariantError from "../../../exceptions/invariant-error.js";

export const getMeals = async (req, res, next) => {
    const userId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;


    try {
        const [meals, totalMeals] = await Promise.all([
            MealRepositories.getMeals(userId, skip, limit),
            MealRepositories.countMeals(userId)
        ])

        const formattedMeals = meals.map((meal) => formatMealResponse(meal))


        const totalPages = Math.ceil(totalMeals / limit);

        return response(res, 200, "Meals berhasil ditampilkan", {
            pagination: {
                currentPage: page,
                limit: limit,
                totalPages,
                totalData: totalMeals,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            },
            meals: formattedMeals
        });

    } catch (error) {
        return next(error);
    }
}

export const createMeal = async (req, res, next) => {
    const userId = req.user?.id;
    const { foodName, mealType, portion, imageUrl, fat, carbohydrate, protein, calorie, water, fiber, confidentScore, predictLogId, servingSizeG, servingDescription } = req.validated;
    const imageFile = req.file;
    
    try {
        let finalImageUrl = imageUrl || null;

        if (imageFile) {
            const fileName = `meal-logs-${userId}-${Date.now()}`;
            const filePath = `food/${fileName}`;

            const { data, error } = await supabase.storage
                .from('food-images')
                .upload(filePath, imageFile.buffer, {
                    contentType: imageFile.mimetype,
                });

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
                .from('food-images')
                .getPublicUrl(filePath);

            finalImageUrl = publicUrl;
        }


        const meal = await MealRepositories.createMeal({ userId, foodName, mealType, portion, imageUrl: finalImageUrl, fat, carbohydrate, protein, calorie, water, fiber, confidentScore: null, predictLogId: null, servingSizeG, servingDescription });

        if (!meal) {
            return next(new InvariantError("Gagal menambahkan meal"));
        }

        return response(res, 201, "Meal berhasil ditambahkan", meal);
    } catch (error) {
        return next(error);
    }
}

export const updateMeal = async (req, res, next) => {
    const userId = req.user.id;
    const mealId = req.params.id;
    const { foodName, mealType, portion, imageUrl, fat, carbohydrate, protein, calorie, water, fiber, confidentScore, predictLogId, servingSizeG, servingDescription } = req.validated;
    const imageFile = req.file;

    try {
        let finalImageUrl = imageUrl || null;

        if (imageFile) {
            const fileName = `meal-logs-${userId}-${Date.now()}`;
            const filePath = `food/${fileName}`;

            const { data, error } = await supabase.storage
                .from('food-images')
                .upload(filePath, imageFile.buffer, {
                    contentType: imageFile.mimetype,
                });

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
                .from('food-images')
                .getPublicUrl(filePath);

            finalImageUrl = publicUrl;
        }

        const meal = await MealRepositories.updateMeal({ userId, mealId, foodName, mealType, portion, imageUrl: finalImageUrl, fat, carbohydrate, protein, calorie, water, fiber, confidentScore, predictLogId, servingSizeG, servingDescription });

        if (!meal) {
            return next(new InvariantError("Gagal memperbarui meal"));
        }

        return response(res, 200, "Meal berhasil diperbarui", meal);
    } catch (error) {
        return next(error);
    }
}

export const deleteMeal = async (req, res, next) => {
    const userId = req.user.id;
    const mealId = req.params.id;

    try {
        const meal = await MealRepositories.deleteMeal({ userId, mealId });

        if (!meal) {
            return next(new InvariantError("Gagal menghapus meal"));
        }

        if (meal.imageUrl) {
            const imagePath = meal.imageUrl.split('/storage/v1/object/public/food-images/')[1];
            if (imagePath) {
                const { error } = await supabase.storage.from('food-images').remove([imagePath]);
                if (error) {
                    console.error("Gagal menghapus gambar dari Supabase Storage:", error);
                }
            }
        }

        return response(res, 200, "Meal berhasil dihapus", meal);
    } catch (error) {
        return next(error);
    }

}

export const getRecomendationMeals = async (req, res, next) => {
    const userId = req.user.id;
    const { recentMealCalorie } = req.validated;

    try {
        const dailySummary = await NutritionRepositories.getDailySummary(userId);
        const profile = await ProfileRepositories.getProfile(userId);

        const calorieConsumed = dailySummary?._sum?.totalCalorie || 0;
        const calorieTarget = profile.profile.calorieTarget || 0;

        const remainingUserQuota = calorieTarget - calorieConsumed;


        const mealResponse = await axios.post(process.env.RECOMENDATION_MEAL_API_URL, {
            sisa_kuota: remainingUserQuota,
            kalori_makanan: recentMealCalorie
        });

        const meals = mealResponse.data;

        if (!meals) {
            return next(new NotFoundError("Rekomendasi meal tidak ditemukan"));
        }

        const mappedMeals = {
            dataAnalysis: {
                remainingUserQuota: meals.data_analisis.sisa_kuota_user,
                calorieTarget: calorieTarget,
                recentMealCalorie: meals.data_analisis.kalori_makanan_baru,
                selectedLabelCategory: meals.data_analisis.label_kategori_terpilih,
                categoryName: meals.data_analisis.nama_kategori
            },
            fruitRecommendations: meals.rekomendasi_buah.map((item) => ({
                name: item.nama,
                calories: item.energi_kcal,
                protein: item.protein_g,
                carbohydrate: item.karbohidrat_g,
                fat: item.lemak_g,
                water: item.air_persen
            })),
        };

        return response(res, 200, "Rekomendasi meal berhasil ditampilkan", { meals: mappedMeals });
    } catch (error) {

        if (error.response) {
            console.error("Error response from recommendation API:", error.response.data);
            return next(new InvariantError("Gagal mendapatkan rekomendasi meal dari API eksternal"));
        }

        return next(error);
    }
}