import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import ProfileRepositories from "../repositories/profile-repositories.js";
import UserRepositories from "../../users/repositories/user-repositories.js";

export const createProfile = async (req, res, next) => {
  const userId = req.user.id;
  const { height, weight, age, gender } = req.validated;

  try {
    const profile = await ProfileRepositories.createProfile({ userId, height, weight, age, gender });
        
    if(!profile) {
      return next(new InvariantError("Gagal membuat profile"));
    }

    return response(res, 201, "Profile berhasil dibuat", { user : profile });
  } catch (error) {
    return next(error);
  }
};

export const getProfile = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const profile = await ProfileRepositories.getProfile(userId);

    if (!profile) {
      return next(new NotFoundError("Profile tidak ditemukan"));
    }

    return response(res, 200, "Profile berhasil diambil", { user : profile });
  } catch (error) {
    return next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  const userId = req.user.id;
  const { height, weight, age, gender } = req.validated;

  try {
    const profile = await ProfileRepositories.updateProfile({ userId, height, weight, age, gender });

    if (!profile) {
      return next(new NotFoundError("Profile tidak ditemukan"));
    }

    return response(res, 200, "Profile berhasil diperbarui", { user : profile });
  } catch (error) {
    return next(error);
  }
};