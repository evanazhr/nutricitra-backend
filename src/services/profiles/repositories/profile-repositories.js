import { prisma } from "../../../lib/prisma.js";

class ProfileRepositories {
  constructor () {
    this.prisma = prisma;
  }

  async createProfile({ userId, height, weight, age }) {
    const profile = await this.prisma.profile.create({
      data: {
        user_id: userId,
        height,
        weight,
        age
      }
    });

    return profile;
  }

  async getProfile(userId) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        user_id: userId
      }
    });

    return profile;
  }

  async updateProfile({ userId, height, weight, age }) {
    const profile = await this.prisma.profile.update({
      where: {
        user_id: userId
      },
      data: {
        height,
        weight,
        age
      }
    });

    return profile;
  }  
}

export default new ProfileRepositories();