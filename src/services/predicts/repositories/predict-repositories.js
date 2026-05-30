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

  async createLog({ userId, food_name, image_url, confident_score, protein, calorie, carbohydrate, fat }) {
    return await this.prisma.predictLog.create({
      data: {
        userId: userId,
        food_name: food_name,
        image_url: image_url,
        confident_score: confident_score,
        protein: protein,
        calorie: calorie,
        carbohydrate: carbohydrate,
        fat: fat
      }
    });
  }
}

export default new PredictRepositories();