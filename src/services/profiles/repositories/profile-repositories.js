import { prisma } from "../../../lib/prisma.js";

class ProfileRepositories {
  constructor () {
    this.prisma = prisma;
  }

  async createProfile({ userId, height, weight, age, gender, calorieTarget, proteinTarget, carbohydrateTarget, fatTarget }) {
    const profile = await this.prisma.profile.create({
      data: {
        userId,
        height,
        weight,
        age,
        gender,
        calorieTarget,
        proteinTarget,
        carbohydrateTarget,
        fatTarget
      }
    });

    return profile;
  }

  async getProfile(userId) {
    const profile = await this.prisma.user.findUnique({
      where: {
        id: userId
      },
      include : {
        profile : true
      }
    });

    return profile;
  }

  async updateProfile({ userId, height, weight, age, gender, calorieTarget, proteinTarget, carbohydrateTarget, fatTarget }) {
    const profile = await this.prisma.profile.update({
      where: {
        userId
      },
      data: {
        height,
        weight,
        age,
        gender,
        calorieTarget,
        proteinTarget,
        carbohydrateTarget,
        fatTarget
      },
      include : {
        user : true
      }
    });

    return profile;
  }  
}

export default new ProfileRepositories();