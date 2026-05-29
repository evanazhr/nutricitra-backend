import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import { supabase } from "../../../lib/supabase-client.js";
import response from "../../../utils/response.js";
import UserRepositories from "../repositories/user-repositories.js";

export const createUser = async (req, res, next) => {
    const { email, fullname, password} = req.validated;
    try {
        const user = await UserRepositories.createUser({ email, fullname, password});

        if(!user) {
            return next(new InvariantError('User gagal dibuat'));
        }

        return response(res, 201, 'User berhasil dibuat', user);
    } catch (error) {
        return next(error);
    }
}

export const getUserById = async (req, res, next) => {
    const {id} = req.params;

    try {
        const user = await UserRepositories.getUserById(id);

        if(!user) {
            return next(new NotFoundError("User tidak ditemukan"));
        }

        return response(res, 200, "User berhasil ditampilkan", user)
    } catch (error) {
        return next(error)
    }
}

export const updateAvatar = async (req, res, next) => {
  try {
    const file = req.file;
    const userId = req.user.id; 

    if (!file) {
        return next(new NotFoundError('File tidak ditemukan'));
    }

    const fileName = `avatar-${userId}`;
    const filePath = `avatars/${fileName}`;

    const { data, error } = await supabase.storage
      .from('avatar-images') 
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('avatar-images')
      .getPublicUrl(filePath);

    const user = await UserRepositories.updateAvatar({userId, publicUrl});
  
    return response(res, 200, "Foto profile sudah diupdate", user)

  } catch (err) {
    return next(err);
  }
};