import TokenManager from "../../../security/token-manager.js";
import UserRepositories from "../../users/repositories/user-repositories.js";
import AuthenticationRepositories from "../repositories/authentication-repositories.js";
import { InvariantError, AuthenticationError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', 
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 
};

export const login = async (req, res, next) => {
  const { email, password } = req.validated;

  try {
    const userId = await UserRepositories.verifyUserCredential(email, password);
        
    if(!userId) {
      return next(new AuthenticationError('Kredensial yang anda berikan salah'));
    }
    
    const accessToken = TokenManager.generateAccessToken({ id: userId });
    const refreshToken = TokenManager.generateRefreshToken({ id: userId });
    
    await AuthenticationRepositories.addRefreshToken(userId, refreshToken);
    
    res.cookie('refreshToken', refreshToken, cookieOptions);
    
    return response(res, 200, 'Authentication berhasil ditambahkan', {
      accessToken
    });
  } catch (error) {
    return next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken; 

  if (!refreshToken) {
    return next(new AuthenticationError('Sesi telah habis, silakan login kembali'));
  }

  try {
    const result = await AuthenticationRepositories.verifyRefreshToken(refreshToken);
    
    if(!result) {
      return next(new InvariantError('Refresh token tidak valid'));
    }
    
    const { id } = TokenManager.verifyRefreshToken(refreshToken);
    
    const accessToken = TokenManager.generateAccessToken({ id });
    
    return response(res, 200, 'Access Token berhasil diperbarui', { accessToken });
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return next(new AuthenticationError('Tidak ada sesi yang aktif'));
  }

  try {
    const result = await AuthenticationRepositories.verifyRefreshToken(refreshToken);
        
    if(!result) {
      return next(new InvariantError('Refresh token tidak valid'));
    }    

    await AuthenticationRepositories.deleteRefreshToken(refreshToken);
    
    res.clearCookie('refreshToken');
    
    return response(res, 200, 'Berhasil logout');
  } catch (error) {
    return next(error);
  }
};

export const logoutAllDevices = async (req, res, next) => {
  const userId = req.user.id; // Asumsi ini didapat dari middleware auth JWT

  try {
    await AuthenticationRepositories.deleteAllRefreshToken(userId);

    res.clearCookie('refreshToken');

    return response(res, 200, 'Berhasil logout dari seluruh device');
  } catch (error) {
    return next(error);
  }
};