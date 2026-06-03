import { prisma } from "../../../lib/prisma.js";

class PredictRepositories {
  constructor() {
    this.prisma = prisma;
  }

  async getPredictLogs(userId, skip, take) {
    return await this.prisma.predictLog.findMany({
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

  async getDataNutrition(foodName) {
    return await this.prisma.foodDictionary.findFirst({
      where: {
        foodName: {
          equals: foodName,
          mode: 'insensitive'
        }
      }
    });
  }

  async countPredictLogs(userId) {
    return await this.prisma.predictLog.count({
      where: {
        userId: userId
      }
    });
  }

  async createLog(data) {
    return await this.prisma.predictLog.create({
      data: {
        userId: data.userId,
        foodName: data.foodName,
        imageUrl: data.imageUrl,
        confidentScore: data.confidentScore,
        portion: data.portion,

        // Gizi Per Serving
        servingSizeG: data.servingSizeG,
        servingDescription: data.servingDescription,
        calorie: data.calorie,
        protein: data.protein,
        carbohydrate: data.carbohydrate,
        fat: data.fat,
        water: data.water,
        fiber: data.fiber,

        // Gizi Total (Per Serving * Portion)
        totalCalorie: data.totalCalorie,
        totalProtein: data.totalProtein,
        totalCarbohydrate: data.totalCarbohydrate,
        totalFat: data.totalFat,
        totalWater: data.totalWater,
        totalFiber: data.totalFiber,

        labelCategory: data.labelCategory,
        originRegion: data.originRegion
      }
    });
  }
}

export default new PredictRepositories();