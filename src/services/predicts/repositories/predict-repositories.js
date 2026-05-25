import { prisma } from "../../../lib/prisma.js";

class PredictRepositories {
  constructor() {
    this.prisma = prisma;
  }

  async getPredictLogs(userId) {
    return await this.prisma.predictLog.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc' 
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

  async getHistoryByUserId(userId) {
    return await this.prisma.predictLog.findMany({
      where: {
        userId: userId
      }
    });
  }
}

export default new PredictRepositories();