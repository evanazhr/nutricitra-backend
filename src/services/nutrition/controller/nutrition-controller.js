import response from "../../../utils/response.js";
import NutritionRepositories from "../repositories/nutrition-repositories.js";

export const getDailySummary = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const consumption = await NutritionRepositories.getDailySummary(userId);

        const summaryData = {
            calorieConsumed: Number((consumption?._sum?.totalCalorie || 0).toFixed(2)),
            proteinConsumed: Number((consumption?._sum?.totalProtein || 0).toFixed(2)),
            carbohydrateConsumed: Number((consumption?._sum?.totalCarbohydrate || 0).toFixed(2)),
            fatConsumed: Number((consumption?._sum?.totalFat || 0).toFixed(2)),
            waterConsumed: Number((consumption?._sum?.totalWater || 0).toFixed(2)),
            fiberConsumed: Number((consumption?._sum?.totalFiber || 0).toFixed(2)),
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

        const toLocalDateString = (d) => {
            const dateObj = new Date(d);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfPeriod);
            date.setDate(startOfPeriod.getDate() + i);

            const dateString = toLocalDateString(date);

            weeklyMap[dateString] = {
                date: dateString,
                dayName: daysName[date.getDay()],
                calorie: 0,
                protein: 0,
                carbohydrate: 0,
                fat: 0,
                water: 0,
                fiber: 0
            };
        }

        meals.forEach((meal) => {
            const mealDateStr = toLocalDateString(meal.createdAt);

            if (weeklyMap[mealDateStr]) {
                weeklyMap[mealDateStr].calorie += meal.totalCalorie || 0;
                weeklyMap[mealDateStr].protein += meal.totalProtein || 0;
                weeklyMap[mealDateStr].carbohydrate += meal.totalCarbohydrate || 0;
                weeklyMap[mealDateStr].fat += meal.totalFat || 0;
                weeklyMap[mealDateStr].water += meal.totalWater || 0;
                weeklyMap[mealDateStr].fiber += meal.totalFiber || 0;
            }
        });

        const chartData = Object.values(weeklyMap).map(day => ({
            ...day,
            calorie: Number(day.calorie.toFixed(2)),
            protein: Number(day.protein.toFixed(2)),
            carbohydrate: Number(day.carbohydrate.toFixed(2)),
            fat: Number(day.fat.toFixed(2)),
            water: Number(day.water.toFixed(2)),
            fiber: Number(day.fiber.toFixed(2))
        }));

        return response(res, 200, "Ringkasan konsumsi grafik mingguan berhasil dimuat", {
            nutrition: chartData
        });

    } catch (error) {
        return next(error);
    }
};