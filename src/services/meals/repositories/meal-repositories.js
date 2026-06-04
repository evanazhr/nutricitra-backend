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

    async getMealById(userId, mealId) {
        return await this.prisma.meal.findFirst({
            where: {
                id: mealId,
                userId: userId
            }
        });
    }

    async createMeal(data) {
        return await this.prisma.meal.create({
            data: {
                userId: data.userId,
                foodName: data.foodName,
                imageUrl: data.imageUrl,
                mealType: data.mealType,
                portion: Number(data.portion),
                fat: Number(data.fat),
                carbohydrate: Number(data.carbohydrate),
                protein: Number(data.protein),
                calorie: Number(data.calorie),
                water: data.water != null ? Number(data.water) : null,
                fiber: data.fiber != null ? Number(data.fiber) : null,
                servingSizeG: data.servingSizeG != null ? Number(data.servingSizeG) : null,
                servingDescription: data.servingDescription || null,
                confidentScore: data.confidentScore ? Number(data.confidentScore) : null,

                ...(data.predictLogId ? {
                    predictLogId: data.predictLogId
                } : {})
            }
        });
    }

    async updateMeal(userId, mealId, data) {
        return await this.prisma.meal.update({
            where: {
                id: mealId,
                userId: userId
            },
            data: {
                foodName: data.foodName,
                imageUrl: data.imageUrl,
                mealType: data.mealType,
                portion: Number(data.portion),
                fat: Number(data.fat),
                carbohydrate: Number(data.carbohydrate),
                protein: Number(data.protein),
                calorie: Number(data.calorie),
                water: data.water != null ? Number(data.water) : null,
                fiber: data.fiber != null ? Number(data.fiber) : null,
                servingSizeG: data.servingSizeG != null ? Number(data.servingSizeG) : null,
                servingDescription: data.servingDescription || null,
                confidentScore: data.confidentScore ? Number(data.confidentScore) : null,

                ...(data.predictLogId ? {
                    predictLogId: data.predictLogId
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