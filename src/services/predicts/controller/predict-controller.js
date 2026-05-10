import response from "../../../utils/response.js";
import PredictRepositories from "../repositories/predict-repositories.js";
import axios from "axios";
import FormData from "form-data";

export const predictImage = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ message: "No file uploaded" });

        const formData = new FormData();
        formData.append("file", file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype,
        });

        const predictResponse = await axios.post(process.env.PREDICT_API_URL, formData, {
            headers: { ...formData.getHeaders() },
        });

        const result = predictResponse.data; 
        
        console.log("Data dari FastAPI:", result);

        return response(res, 200, "Prediksi berhasil", { predict: result });
        
    } catch (error) {
        console.error("FastAPI Error:", error.response?.data || error.message);
        return next(error);
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