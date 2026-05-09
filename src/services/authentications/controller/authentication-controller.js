import TokenManager from "../../../security/token-manager.js";
import UserRepositories from "../../users/repositories/user-repositories.js";
import AuthenticationRepositories from "../repositories/authentication-repositories.js";
import { InvariantError, AuthenticationError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";

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
    
    return response(res, 200, 'Authentication berhasil ditambahkan', {
      accessToken,
      refreshToken
    });
  } catch (error) {
    return next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.validated;

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
  const { refreshToken } = req.validated;

  try {
    const result = await AuthenticationRepositories.verifyRefreshToken(refreshToken);
        
    if(!result) {
      return next(new InvariantError('Refresh token tidak valid'));
    }    

    await AuthenticationRepositories.deleteRefreshToken(refreshToken);
    
    return response(res, 200, 'Refresh token berhasil dihapus');
  } catch (error) {
    return next(error);
  }
};

export const logoutAllDevices = async (req, res, next) => {
  const userId = req.user.id;

  try {
    await AuthenticationRepositories.deleteAllRefreshToken(userId);

    return response(res, 200, 'Berhasil logout dari seluruh device');
  } catch (error) {
    return next(error);
  }
}