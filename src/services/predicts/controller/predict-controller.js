import response from "../../../utils/response.js";
import PredictRepositories from "../repositories/predict-repositories.js";
import axios from "axios";

export const predictImage = async (req, res, next) => {
    const userId = req.user.id
    const file = req.file;
    try {

        const blob = new Blob([file.buffer], { type: file.mimetype });

        const formData = new FormData();
        formData.append("file", blob, file.originalname);

        const predict = await axios.post(process.env.PREDICT_API_URL, formData, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        })

        const predictResult = predict.data

        const {userId, foodName, imageUrl, confidentScore, protein, calorie} = predictResult.data

        const createLog = await PredictRepositories.createLog({userId, foodName, imageUrl, confidentScore, protein, calorie})

        return response(res, 200, 'Berhasil prediksi gambar', predict.data);
        
    } catch (error) {
        console.log(error.response)
        return next(error)
    }
}

export const getPredictLogs = async (req, res, next) => {
    const userId = req.user.id;

    try {

        const predictLogs = await PredictRepositories.getPredictLogs(userId)
        
        return response(res, 200, "Predict Logs berhasil ditampilkan", {predictLogs})

    } catch (error) {
        return next(error)
    }
}