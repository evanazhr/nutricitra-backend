import response from "../../../utils/response.js";
import FoodRepositories from "../repositories/food-repositories.js";
import NotFoundError from "../../../exceptions/not-found-error.js";

export const getFoodNutrition = async (req, res, next) => {
  try {
    const { name } = req.params;

    const foodNutrition = await FoodRepositories.getDataNutrition(name);

    if (!foodNutrition) {
      return next(new NotFoundError("Data nutrisi makanan tidak ditemukan"));
    }

    return response(res, 200, "Berhasil mengambil data nutrisi makanan", { food: foodNutrition });
  } catch (error) {
    next(error);
  }
};

export const searchFoods = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return response(res, 200, "Masukkan nama makanan untuk dicari", { foods: [] });
    }

    const foods = await FoodRepositories.searchFoods(q, 10);

    return response(res, 200, "Berhasil mencari data makanan", { foods });
  } catch (error) {
    next(error);
  }
};
