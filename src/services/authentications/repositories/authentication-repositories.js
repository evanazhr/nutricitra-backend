import { prisma } from "../../../lib/prisma.js";

class AuthenticationRepositories {
  constructor () {
    this.prisma = prisma;
  }

  async addRefreshToken(userId, token) {
    await this.prisma.authentication.create({
      data: {
        userId: userId,
        token: token
      }
    });
  }

  async deleteRefreshToken(refreshToken) {
    return await this.prisma.authentication.delete({
      where: { token: refreshToken }
    });
  }

  async verifyRefreshToken( token) {
    const result = await this.prisma.authentication.findUnique({
      where: { token: token }
    });

    if(!result) {
      return false;
    }

    return result;
  }

  async deleteAllRefreshToken(userId) {
    return await this.prisma.authentication.deleteMany({
      where: {
        userId: userId
      }
    });
  }

}

export default new AuthenticationRepositories();