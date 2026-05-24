import { prisma } from "../../../lib/prisma.js";

class ProfileRepositories {
  constructor () {
    this.prisma = prisma;
  }

  async createProfile({ userId, height, weight, age, gender }) {
    const profile = await this.prisma.profile.create({
      data: {
        userId : userId,
        height,
        weight,
        age,
        gender
      }
    });

    return profile;
  }

  async getProfile(userId) {
    const profile = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    return profile;
  }

  async updateProfile({ userId, height, weight, age, gender }) {
    const profile = await this.prisma.profile.update({
      where: {
        userId: userId
      },
      data: {
        height,
        weight,
        age,
        gender
      }
    });

    return profile;
  }  
}

export default new ProfileRepositories();