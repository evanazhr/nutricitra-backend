import response from "../../../utils/response.js";
import FoodRepositories from "../repositories/food-repositories.js";

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
