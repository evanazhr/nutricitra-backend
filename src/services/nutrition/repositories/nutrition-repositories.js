import { prisma } from "../../../lib/prisma.js";

class NutritionRepositories {
    constructor() {
        this.prisma = prisma
    }
    async getDailySummary(userId) {
        const now = new Date();

        const startOfDay = new Date(now.setHours(0, 0, 0, 0));

        const endOfDay = new Date(now.setHours(23, 59, 59, 999));

        const meals = await this.prisma.meal.findMany({
            where: {
                userId: userId,
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            select: {
                calorie: true,
                protein: true,
                carbohydrate: true,
                fat: true,
                water: true,
                fiber: true,
                portion: true
            }
        });

        const summary = meals.reduce((acc, meal) => {
            acc.totalCalorie += (meal.calorie || 0) * (meal.portion || 1);
            acc.totalProtein += (meal.protein || 0) * (meal.portion || 1);
            acc.totalCarbohydrate += (meal.carbohydrate || 0) * (meal.portion || 1);
            acc.totalFat += (meal.fat || 0) * (meal.portion || 1);
            acc.totalWater += (meal.water || 0) * (meal.portion || 1);
            acc.totalFiber += (meal.fiber || 0) * (meal.portion || 1);
            return acc;
        }, { totalCalorie: 0, totalProtein: 0, totalCarbohydrate: 0, totalFat: 0, totalWater: 0, totalFiber: 0 });

        return { _sum: summary };
    }

    async getWeeklySummary(userId) {
        const now = new Date();

        // Ambil awal hari dari 6 hari lalu (Total 7 hari termasuk hari ini)
        const startOfPeriod = new Date(now);
        startOfPeriod.setDate(now.getDate() - 6);
        startOfPeriod.setHours(0, 0, 0, 0);

        const endOfPeriod = new Date(now);
        endOfPeriod.setHours(23, 59, 59, 999);

        // Ambil semua data makan user dalam rentang 7 hari 
        const meals = await this.prisma.meal.findMany({
            where: {
                userId: userId,
                createdAt: {
                    gte: startOfPeriod,
                    lte: endOfPeriod,
                },
            },
            select: {
                calorie: true,
                protein: true,
                carbohydrate: true,
                fat: true,
                water: true,
                fiber: true,
                portion: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return { meals, startOfPeriod };
    }
}

export default new NutritionRepositories();