import { prisma } from "../../../lib/prisma.js";

class NutritionRepositories {
    constructor() {
        this.prisma = prisma
    }

    _getWIBRange(daysOffset = 0) {
        const now = new Date();

        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);

        const wibTime = new Date(utcTime + (7 * 3600000));

        const year = wibTime.getFullYear();
        const month = wibTime.getMonth();
        const date = wibTime.getDate() - daysOffset;

        const start = new Date(Date.UTC(year, month, date, 0 - 7, 0, 0, 0));
        const end = new Date(Date.UTC(year, month, date, 23 - 7, 59, 59, 999));

        return { start, end };
    }

    async getDailySummary(userId) {
        const { start: startOfDay, end: endOfDay } = this._getWIBRange(0);

        // Ambil semua data makan user di hari ini
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
        const { start: startOfPeriod } = this._getWIBRange(6);
        const { end: endOfPeriod } = this._getWIBRange(0);

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