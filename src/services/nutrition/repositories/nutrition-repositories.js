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
}

export default new NutritionRepositories();