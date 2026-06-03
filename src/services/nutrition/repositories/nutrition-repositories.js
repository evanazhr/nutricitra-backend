import { prisma } from "../../../lib/prisma.js";


class NutritionRepositories {
    constructor() {
        this.prisma = prisma
    }
    async getDailySummary(userId) {
        const now = new Date();

        const startOfDay = new Date(now.setHours(0, 0, 0, 0));

        const endOfDay = new Date(now.setHours(23, 59, 59, 999));

        const summary = await this.prisma.meal.groupBy({
            by: ['userId'],
            where: {
                userId: userId,
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            _sum: {
                totalCalorie: true,
                totalProtein: true,
                totalCarbohydrate: true,
                totalFat: true,
                totalWater: true,
                totalFiber: true,
            },
        });
        return summary[0] || null;
    }

    async getWeeklySummary(userId) {
        const now = new Date();

        // Ambil awal hari dari 6 hari lalu (Total 7 hari termasuk hari ini)
        const startOfPeriod = new Date(now);
        startOfPeriod.setDate(now.getDate() - 6);
        startOfPeriod.setHours(0, 0, 0, 0);

        const endOfPeriod = new Date(now);
        endOfPeriod.setHours(23, 59, 59, 999);

        // Ambil semua data makan user dalam rentang 7 hari tersebut
        const meals = await this.prisma.meal.findMany({
            where: {
                userId: userId,
                createdAt: {
                    gte: startOfPeriod,
                    lte: endOfPeriod,
                },
            },
            select: {
                totalCalorie: true,
                totalProtein: true,
                totalCarbohydrate: true,
                totalFat: true,
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