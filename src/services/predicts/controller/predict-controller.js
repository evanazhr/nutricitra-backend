import { supabase } from "../../../lib/supabase-client.js";
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
    console.log(result);

    const mappingResults = {
      ...result,
      ...result.results[0],
      nutrition: {
        protein: 100,
        calorie: 500,
        carbohydrate: 50,
        fat: 20
      },
    }

    if (!mappingResults.food_name) {
      return next(new Error("Food name not found in prediction results"));
    }

    const fileName = `predict-logs-${userId}-${Date.now()}`;
    const filePath = `food/${fileName}`;

    const { data, error } = await supabase.storage
      .from('food-images') 
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('food-images')
      .getPublicUrl(filePath);

    console.log("Data dari FastAPI:", mappingResults);


    await PredictRepositories.createLog({
      userId,
      food_name: mappingResults.food_name,
      image_url: publicUrl,
      confident_score: mappingResults.confidence,
      protein: mappingResults.nutrition.protein,
      calorie: mappingResults.nutrition.calorie,
      carbohydrate: mappingResults.nutrition.carbohydrate,
      fat: mappingResults.nutrition.fat
    });


    return response(res, 200, "Prediksi dan mengirim log berhasil", {
      predict: {
        ...mappingResults
      }
    });

  } catch (error) {
    console.error("FastAPI Error:", error.response?.data || error.message);
    return next(error);
  }
};

export const getPredictLogs = async (req, res, next) => {
  const userId = req.user.id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [predictLogs, totalLogs] = await Promise.all([
      PredictRepositories.getPredictLogs(userId, skip, limit),
      PredictRepositories.countPredictLogs(userId)
    ]);
    
    const totalPages = Math.ceil(totalLogs / limit);

    return response(res, 200, "Predict Logs berhasil ditampilkan", { 
      predictLogs,
      pagination : {
        currentPage: page,
        limit: limit,
        totalPages,
        totalData : totalLogs,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    return next(error);
  }
};