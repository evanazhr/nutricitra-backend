import { supabase } from "../../../lib/supabase-client.js";
import response from "../../../utils/response.js";
import MealRepositories from "../repositories/meal-repositories.js";

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


        const totalPages = Math.ceil(totalMeals / limit);

        return response(res, 200, "Meals berhasil ditampilkan", {
            meals,
            pagination: {
                currentPage: page,
                limit: limit,
                totalPages,
                totalData: totalMeals,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });

    } catch (error) {
        return next(error);
    }
}

export const createMeal = async (req, res, next) => {
    const userId = req.user.id;
    const { food_name, mealType, portion, image_url, fat, carbohydrate, protein, calorie, confident_score, predictLogId } = req.validated;
    const imageFile = req.file;

    try {
        let finalImageUrl = image_url || null;

        if(imageFile) {
            const fileName = `-${userId}-${Date.now()}`;
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


        const meal = await MealRepositories.createMeal({ userId, food_name, mealType, portion, image_url: finalImageUrl, fat, carbohydrate, protein, calorie, confident_score: null, predictLogId: null });

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
    const { food_name, mealType, portion, image_url, fat, carbohydrate, protein, calorie, confident_score, predictLogId } = req.validated;
    
    try {
        const meal = await MealRepositories.updateMeal({ userId, mealId, food_name, mealType, portion, image_url, fat, carbohydrate, protein, calorie, confident_score, predictLogId });

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

        if(meal.image_url) {
            const imagePath = meal.image_url.split('/storage/v1/object/public/food-images/')[1];
            if(imagePath) {
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