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
}

export default new FoodRepositories();
