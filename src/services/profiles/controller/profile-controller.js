import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import ProfileRepositories from "../repositories/profile-repositories.js";
import predictRepositories from "../../predicts/repositories/predict-repositories.js";
import { calculateBMI } from "../../../utils/index.js";

const formatProfileResponse = (userWithProfile, totalScans) => {
  const { age, gender, height, weight, breastfeedingStage, pregnancyTrimester, calorieTarget, carbohydrateTarget, fatTarget, proteinTarget } = userWithProfile.profile || {};

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
    pregnancyTrimester: pregnancyTrimester || 0,
    breastfeedingStage: breastfeedingStage || 0,
    calorieTarget: calorieTarget || 0,
    carbohydrateTarget: carbohydrateTarget || 0,
    proteinTarget: proteinTarget || 0,
    fatTarget: fatTarget || 0,
    createdAt: userWithProfile.createdAt,
    updatedAt: userWithProfile.updatedAt,
    isProfileComplete: !!userWithProfile.profile
  };
};

export const createProfile = async (req, res, next) => {
  const userId = req.user.id;
  const { height, weight, age, gender, calorieTarget, proteinTarget, carbohydrateTarget, fatTarget, pregnancyTrimester, breastfeedingStage } = req.validated;

  try {
    const profile = await ProfileRepositories.createProfile({ userId, height, weight, age, gender, calorieTarget, proteinTarget, carbohydrateTarget, fatTarget, pregnancyTrimester, breastfeedingStage });

    if (!profile) {
      return next(new InvariantError("Gagal membuat profile"));
    }

    const getProfileData = await ProfileRepositories.getProfile(userId);
    const totalScans = await predictRepositories.countPredictLogs(userId);

    const user = formatProfileResponse(getProfileData, totalScans);

    return response(res, 201, "Profile berhasil dibuat", { user });
  } catch (error) {
    if (error.code === 'P2002') {
      return next(new InvariantError("Profile untuk user ini sudah ada"));
    }
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

    return response(res, 200, "Profile berhasil diambil", {
      user
    });
  } catch (error) {
    return next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  const userId = req.user.id;
  const { height, weight, age, gender, calorieTarget, proteinTarget, carbohydrateTarget, fatTarget, pregnancyTrimester, breastfeedingStage } = req.validated;

  try {
    const existingProfile = await ProfileRepositories.getProfile(userId);
    if (!existingProfile) {
      return next(new NotFoundError("Profile tidak ditemukan"));
    }

    await ProfileRepositories.updateProfile({ userId, height, weight, age, gender, calorieTarget, proteinTarget, carbohydrateTarget, fatTarget, pregnancyTrimester, breastfeedingStage });

    const profileData = await ProfileRepositories.getProfile(userId);
    const totalScans = await predictRepositories.countPredictLogs(userId); // FIX: Masukkan userId

    const user = formatProfileResponse(profileData, totalScans);

    return response(res, 200, "Profile berhasil diperbarui", { user });
  } catch (error) {
    return next(error);
  }
};

export const getDefaultAkgData = async (req, res, next) => {
  try {
    const { age, gender, pregnancyTrimester, breastfeedingStage } = req.validated;

    const calculatedMonths = Math.floor(age * 12);

    let queryFlags = {
      gender: gender === 'male' ? 0 : 1,
      pregnancyTrimester1: 0,
      pregnancyTrimester2: 0,
      pregnancyTrimester3: 0,
      breastfeedingFirst6m: 0,
      breastfeedingSecond6m: 0
    };

    if (queryFlags.gender === 1) {
      if (pregnancyTrimester === 1) queryFlags.pregnancyTrimester1 = 1;
      if (pregnancyTrimester === 2) queryFlags.pregnancyTrimester2 = 1;
      if (pregnancyTrimester === 3) queryFlags.pregnancyTrimester3 = 1;

      if (breastfeedingStage === 1) queryFlags.breastfeedingFirst6m = 1;
      if (breastfeedingStage === 2) queryFlags.breastfeedingSecond6m = 1;
    }

    const targetAkg = await ProfileRepositories.getDefaultAkgData({
      ageMinMonths: calculatedMonths,
      ageMaxMonths: calculatedMonths,
      ...queryFlags
    });

    if (!targetAkg || targetAkg.length === 0) {
      return next(new NotFoundError("Data referensi target AKG gizi tidak ditemukan untuk profil yang diberikan"));
    }

    return response(res, 200, "Data referensi target AKG gizi berhasil diambil", { akg: targetAkg[0] });

  } catch (error) {
    next(error);
  }
}