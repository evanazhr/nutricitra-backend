import { prisma } from "../../../lib/prisma.js";
import bcrypt from 'bcrypt';

class UserRepositories {
  constructor() {
    this.prisma = prisma;
  }

  async createUser({ email, fullname, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prisma.user.create({
      data: {
        email, 
        fullname,
        password: hashedPassword
      }
    });   
  }

  async getUserById(id) {
    return await this.prisma.user.findUnique({
      where: { id: id }
    });
  }

  async updateUser({ id, fullname }) {
    return await this.prisma.user.update({
      where: { id: id },
      data: {
        fullname: fullname,
      }
    });
  }

  async deleteUser(id) {
    return await this.prisma.user.delete({
      where: { id: id }
    });
  }

  async updateAvatar ({ userId, publicUrl }) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: publicUrl } 
    });
  }

  async verifyEmail(email) {
    const result = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });
    
    return result ? true : false;
  }
    
  async verifyUserCredential(email, password) {    
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        password: true
      },
      where: {
        email: email
      }
    });

    if(!user) {
      return null;
    }
    
    const { id, password: hashedPassword } = user;
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    
    if(!isPasswordMatch) {
      return null;
    }
            
    return id;
  }

}

export default new UserRepositories();