import { prisma } from "../../../lib/prisma.js";

class PredictRepositories {
    constructor(){
        this.prisma = prisma;
    }

    async getPredictLogs(userId){
        return await this.prisma.predictlog.findMany({
            where : {
                userId : userId
            }
        })
    }

    async createLog({userId, foodName, imageUrl, confidentScore, protein, calorie}){
        return await this.prisma.predictlog.create({
            data : {
                userId : userId,
                foodName : foodName,
                imageUrl : imageUrl,
                confidentScore : confidentScore,
                protein : protein,
                calorie : calorie
            }
        })
    }

    async getHistoryByUserId(userId) {
        return await this.prisma.predictlog.findMany({
            where : {
                userId : userId
            }
        })
    }
}

export default new PredictRepositories();