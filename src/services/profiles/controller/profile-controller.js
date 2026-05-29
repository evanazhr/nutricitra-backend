import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import ProfileRepositories from "../repositories/profile-repositories.js";
import predictRepositories from "../../predicts/repositories/predict-repositories.js";
import { calculateBMI } from "../../../utils/index.js";

const formatProfileResponse = (userWithProfile, totalScans) => {
  const { age, gender, height, weight, calorieTarget, carbohydrateTarget, fatTarget, proteinTarget } = userWithProfile.profile || {};
  
  const bmi = calculateBMI(height, weight);

  return {
    id: userWithProfile.id,
    email: userWithProfile.email,
    fullname: userWithProfile.fullname,
    avatarUrl: userWithProfile.avatarUrl,
    totalScans,
    height: height || 0,
    weight: weight || 0,
    bmi: bmi ? bmi : 0, 
    age: age || 0,
    gender: gender || "Unspecified",
    calorieTarget: calorieTarget || 0,
    carbohydrateTarget: carbohydrateTarget || 0,
    proteinTarget: proteinTarget || 0,
    fatTarget: fatTarget || 0,
    createdAt: userWithProfile.createdAt,
    updatedAt: userWithProfile.updatedAt
  };
};

export const createProfile = async (req, res, next) => {
  const userId = req.user.id;
  const { height, weight, age, gender, calorieTarget, proteinTarget, carbohydrateTarget, fatTarget } = req.validated;

  try {
    const profile = await ProfileRepositories.createProfile({ userId, height, weight, age, gender, calorieTarget, proteinTarget, carbohydrateTarget, fatTarget });

    if (!profile) {
      return next(new InvariantError("Gagal membuat profile"));
    }

    return response(res, 201, "Profile berhasil dibuat", { user: profile });
  } catch (error) {
    return next(error);
  }
};

export const getProfile = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const [profileData, totalScans] = await Promise.all([
      ProfileRepositories.getProfile(userId),
      predictRepositories.countPredictLogs(userId) 
    ]);

    if (!profileData) {
      return next(new NotFoundError("Profile tidak ditemukan"));
    }

    const user = formatProfileResponse(profileData, totalScans);

    return response(res, 200, "Profile berhasil diambil", { user });
  } catch (error) {
    return next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  const userId = req.user.id;
  const { height, weight, age, gender, calorieTarget, proteinTarget, carbohydrateTarget, fatTarget } = req.validated;

  try {
    const isUpdated = await ProfileRepositories.updateProfile({ userId, height, weight, age, gender, calorieTarget, proteinTarget, carbohydrateTarget, fatTarget });

    if (!isUpdated) {
      return next(new NotFoundError("Profile tidak ditemukan"));
    }

    const profileData = await ProfileRepositories.getProfile(userId);
    const totalScans = await predictRepositories.countPredictLogs(userId); // FIX: Masukkan userId

    const user = formatProfileResponse(profileData, totalScans);

    return response(res, 200, "Profile berhasil diperbarui", { user });
  } catch (error) {
    return next(error);
  }
};