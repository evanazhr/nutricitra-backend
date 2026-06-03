import { prisma } from "../../../lib/prisma.js";

class MealRepositories {
    constructor() {
        this.prisma = prisma
    }

    async getMeals(userId, skip, take) {
        return await this.prisma.meal.findMany({
            where: {
                userId: userId,
            },
            skip: skip,
            take: take,
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async countMeals(userId) {
        return await this.prisma.meal.count({
            where: {
                userId: userId
            }
        });
    }

    async createMeal({ userId, foodName, imageUrl, mealType, portion, predictLogId, fat, carbohydrate, protein, calorie, water, fiber, confidentScore, servingSizeG, servingDescription }) {
        return await this.prisma.meal.create({
            data: {
                userId,
                foodName,
                imageUrl,
                mealType,
                portion: Number(portion),
                fat: Number(fat),
                carbohydrate: Number(carbohydrate),
                protein: Number(protein),
                calorie: Number(calorie),
                water: water != null ? Number(water) : null,
                fiber: fiber != null ? Number(fiber) : null,
                servingSizeG: servingSizeG != null ? Number(servingSizeG) : null,
                servingDescription: servingDescription || null,
                confidentScore: confidentScore ? Number(confidentScore) : null,
                totalCalorie: Number(calorie) * Number(portion),
                totalCarbohydrate: Number(carbohydrate) * Number(portion),
                totalFat: Number(fat) * Number(portion),
                totalProtein: Number(protein) * Number(portion),
                totalWater: water != null ? Number(water) * Number(portion) : null,
                totalFiber: fiber != null ? Number(fiber) * Number(portion) : null,

                ...(predictLogId ? {
                    predictLog: {
                        connect: { id: predictLogId }
                    }
                } : {})
            }
        });
    }

    async updateMeal({ userId, mealId, foodName, imageUrl, mealType, portion, predictLogId, fat, carbohydrate, protein, calorie, water, fiber, confidentScore, servingSizeG, servingDescription }) {
        return await this.prisma.meal.update({
            where: {
                id: mealId,
                userId: userId
            },
            data: {
                foodName,
                imageUrl,
                mealType,
                portion: Number(portion),
                fat: Number(fat),
                carbohydrate: Number(carbohydrate),
                protein: Number(protein),
                calorie: Number(calorie),
                water: water != null ? Number(water) : null,
                fiber: fiber != null ? Number(fiber) : null,
                servingSizeG: servingSizeG != null ? Number(servingSizeG) : null,
                servingDescription: servingDescription || null,
                confidentScore: confidentScore ? Number(confidentScore) : null,
                totalCalorie: Number(calorie) * Number(portion),
                totalCarbohydrate: Number(carbohydrate) * Number(portion),
                totalFat: Number(fat) * Number(portion),
                totalProtein: Number(protein) * Number(portion),
                totalWater: water != null ? Number(water) * Number(portion) : null,
                totalFiber: fiber != null ? Number(fiber) * Number(portion) : null,

                ...(predictLogId ? {
                    predictLog: {
                        connect: { id: predictLogId }
                    }
                } : {})
            }
        });
    }

    async deleteMeal({ userId, mealId }) {
        return await this.prisma.meal.delete({
            where: {
                id: mealId,
                userId: userId
            }
        });
    }
}

export default new MealRepositories();