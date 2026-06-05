import { prisma } from "../../../lib/prisma.js";

class FoodRepositories {
  constructor() {
    this.prisma = prisma;
  }

  async searchFoods(query, limit = 10) {
    return await this.prisma.foodDictionary.findMany({
      where: {
        foodName: {
          contains: query,
          mode: 'insensitive'
        }
      },
      take: limit,
      orderBy: {
        foodName: 'asc'
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
}

export default new FoodRepositories();
