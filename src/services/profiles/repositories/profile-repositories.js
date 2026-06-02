import { prisma } from "../../../lib/prisma.js";

class ProfileRepositories {
  constructor() {
    this.prisma = prisma;
  }

  async createProfile({ userId, height, weight, age, gender, calorieTarget, proteinTarget, carbohydrateTarget, fatTarget, pregnancyTrimester, breastfeedingStage }) {
    const profile = await this.prisma.profile.create({
      data: {
        userId,
        height,
        weight,
        age,
        gender,
        pregnancyTrimester,
        breastfeedingStage,
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
      include: {
        profile: true
      }
    });

    return profile;
  }

  async updateProfile({ userId, height, weight, age, gender, calorieTarget, proteinTarget, carbohydrateTarget, fatTarget, pregnancyTrimester, breastfeedingStage }) {
    // Cukup gunakan satu query upsert untuk menangani Create atau Update sekaligus
    const profile = await this.prisma.profile.upsert({
      where: {
        userId: userId, 
      },
      update: {
        height,
        weight,
        age,
        gender,
        pregnancyTrimester,
        breastfeedingStage,
        calorieTarget,
        proteinTarget,
        carbohydrateTarget,
        fatTarget,
      },
      create: {
        userId, 
        height,
        weight,
        age,
        gender,
        pregnancyTrimester,
        breastfeedingStage,
        calorieTarget,
        proteinTarget,
        carbohydrateTarget,
        fatTarget,
      },
      include: {
        user: true, 
      },
    });

    return profile;
  }

  async getDefaultAkgData({ ageMinMonths, ageMaxMonths, gender, pregnancyTrimester1, pregnancyTrimester2, pregnancyTrimester3, breastfeedingFirst6m, breastfeedingSecond6m }) {
    const akgData = await this.prisma.akgReference.findMany({
      where: {
        ageMinMonths: { lte: ageMinMonths },
        ageMaxMonths: { gte: ageMaxMonths },
        gender,
        pregnancyTrimester1,
        pregnancyTrimester2,
        pregnancyTrimester3,
        breastfeedingFirst6m,
        breastfeedingSecond6m
      }
    });
    return akgData;
  }
}

export default new ProfileRepositories();