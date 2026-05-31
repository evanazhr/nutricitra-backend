import response from "../../../utils/response.js";
import NutritionRepositories from "../repositories/nutrition-repositories.js";

export const getDailySummary = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const consumption = await NutritionRepositories.getDailySummary(userId);

        const summaryData = {
            calorieConsumed: consumption?._sum?.totalCalorie || 0,
            proteinConsumed: consumption?._sum?.totalProtein || 0,
            carbohydrateConsumed: consumption?._sum?.totalCarbohydrate || 0,
            fatConsumed: consumption?._sum?.totalFat || 0,
            waterConsumed: consumption?._sum?.totalWater || 0,
            fiberConsumed: consumption?._sum?.totalFiber || 0,
        };

        return response(res, 200, "Ringkasan konsumsi harian berhasil dimuat", {
            nutrition: summaryData
        });

    } catch (error) {
        return next(error);
    }
};