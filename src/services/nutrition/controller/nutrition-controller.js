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


export const getWeeklySummary = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const { meals, startOfPeriod } = await NutritionRepositories.getWeeklySummary(userId);

        const weeklyMap = {};
        const daysName = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfPeriod);
            date.setDate(startOfPeriod.getDate() + i);

            const dateString = date.toISOString().split('T')[0];

            weeklyMap[dateString] = {
                date: dateString,
                dayName: daysName[date.getDay()],
                calorie: 0,
                protein: 0,
                carbohydrate: 0,
                fat: 0
            };
        }

        meals.forEach((meal) => {
            const mealDateStr = new Date(meal.createdAt).toISOString().split('T')[0];

            if (weeklyMap[mealDateStr]) {
                weeklyMap[mealDateStr].calorie += meal.totalCalorie || 0;
                weeklyMap[mealDateStr].protein += meal.totalProtein || 0;
                weeklyMap[mealDateStr].carbohydrate += meal.totalCarbohydrate || 0;
                weeklyMap[mealDateStr].fat += meal.totalFat || 0;
            }
        });

        const chartData = Object.values(weeklyMap);

        return response(res, 200, "Ringkasan konsumsi grafik mingguan berhasil dimuat", {
            nutrition: chartData
        });

    } catch (error) {
        return next(error);
    }
};