import { supabase } from "../../../lib/supabase-client.js";
import { formatPredictLogResponse } from "../../../utils/index.js";
import response from "../../../utils/response.js";
import PredictRepositories from "../repositories/predict-repositories.js";
import axios from "axios";
import FormData from "form-data";

export const predictImage = async (req, res, next) => {
  const userId = req.user.id;
  const portion = parseFloat(req.body.portion) || 1;
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
    const aiResult = result.results[0];

    if (!aiResult || !aiResult.food_name) {
      return next(new Error("Tidak dapat memprediksi makanan dari gambar"));
    }

    const foodNutrition = await PredictRepositories.getDataNutrition(aiResult.food_name);
    // Satukan hasil mapping data dari AI dan data gizi lokal
    const mappingResults = {
      foodName: aiResult.food_name,
      confidence: aiResult.confidence,
      portion: portion,
      nutrition: {
        servingDescription: foodNutrition?.servingDescription || null,
        servingSizeG: foodNutrition?.servingSizeG || null,
        calorie: foodNutrition?.calorie || 0,
        protein: foodNutrition?.protein || 0,
        carbohydrate: foodNutrition?.carbohydrate || 0,
        fat: foodNutrition?.fat || 0,
        water: foodNutrition?.water || null,
        fiber: foodNutrition?.fiber || null,
        labelCategory: foodNutrition?.labelCategory || null,
        originRegion: foodNutrition?.originRegion || null,
      },
      totalNutrition: {
        calorie: (foodNutrition?.calorie || 0) * portion,
        protein: (foodNutrition?.protein || 0) * portion,
        carbohydrate: (foodNutrition?.carbohydrate || 0) * portion,
        fat: (foodNutrition?.fat || 0) * portion,
        water: foodNutrition?.water !== null ? foodNutrition.water * portion : null,
        fiber: foodNutrition?.fiber !== null ? foodNutrition.fiber * portion : null,
      }
    }

    const fileName = `predict-logs-${userId}-${Date.now()}`;
    const filePath = `food/${fileName}`;

    const { error: storageError } = await supabase.storage
      .from('food-images')
      .upload(filePath, file.buffer, { contentType: file.mimetype });

    if (storageError) throw storageError;

    const { data: { publicUrl } } = supabase.storage
      .from('food-images')
      .getPublicUrl(filePath);

    const predictLog = await PredictRepositories.createLog({
      userId,
      foodName: mappingResults.foodName,
      imageUrl: publicUrl,
      confidentScore: mappingResults.confidence,
      portion: mappingResults.portion,

      calorie: mappingResults.nutrition.calorie,
      protein: mappingResults.nutrition.protein,
      carbohydrate: mappingResults.nutrition.carbohydrate,
      fat: mappingResults.nutrition.fat,
      water: mappingResults.nutrition.water,
      fiber: mappingResults.nutrition.fiber,

      totalCalorie: mappingResults.totalNutrition.calorie,
      totalProtein: mappingResults.totalNutrition.protein,
      totalCarbohydrate: mappingResults.totalNutrition.carbohydrate,
      totalFat: mappingResults.totalNutrition.fat,
      totalWater: mappingResults.totalNutrition.water,
      totalFiber: mappingResults.totalNutrition.fiber,

      labelCategory: mappingResults.nutrition.labelCategory,
      originRegion: mappingResults.nutrition.originRegion
    });

    const responseData = {
      id: predictLog.id,
      ...mappingResults,
    }

    return response(res, 200, "Prediksi dan mengirim log berhasil", {
      predict: responseData,
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

    // format data predictLogs agar lebih rapi dan mudah dipahami di response
    const formattedLogs = predictLogs.map(log => formatPredictLogResponse(log));

    return response(res, 200, "Predict Logs berhasil ditampilkan", {
      pagination: {
        currentPage: page,
        limit: limit,
        totalPages,
        totalData: totalLogs,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      predictLogs: formattedLogs
    });

  } catch (error) {
    return next(error);
  }
};

