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

    async createMeal({ userId, food_name, image_url, mealType, portion, predictLogId, fat, carbohydrate, protein, calorie, confident_score }) {
        return await this.prisma.meal.create({
            data: {
                food_name,
                image_url,
                mealType,
                portion: Number(portion),
                fat: Number(fat),
                carbohydrate: Number(carbohydrate),
                protein: Number(protein),
                calorie: Number(calorie),
                confident_score: confident_score ? Number(confident_score) : null,
                
                user: {
                    connect: { id: userId }
                },

                ...(predictLogId ? {
                    predictLog: {
                        connect: { id: predictLogId }
                    }
                } : {})
            }
        });
    }

    async updateMeal({ userId, mealId, food_name, image_url, mealType, portion, predictLogId, fat, carbohydrate, protein, calorie, confident_score }) {
        return await this.prisma.meal.update({
            where: {
                id: mealId,
                userId: userId 
            },
            data: {
                food_name,
                image_url,
                mealType,
                portion: Number(portion),
                fat: Number(fat),
                carbohydrate: Number(carbohydrate),
                protein: Number(protein),
                calorie: Number(calorie),
                confident_score: confident_score ? Number(confident_score) : null,

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