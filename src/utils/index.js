
export const calculateBMI = (height, weight) => {
  if (!height || !weight || height <= 0 || weight <= 0) {
    return { bmi: 0, category: "Data tidak valid" };
  }

  const heightInMeters = height / 100;

  const bmi = weight / (heightInMeters * heightInMeters);

  const bmiRounded = parseFloat(bmi.toFixed(1));

  return bmiRounded
};



// helper function untuk format response predict log
export const formatPredictLogResponse = (log) => {
  return {
    id: log.id,
    userId: log.userId,
    foodName: log.foodName,
    confidenceScore: log.confidentScore,
    imageUrl: log.imageUrl,
    portion: log.portion,
    createdAt: log.createdAt,
    updatedAt: log.updatedAt,
    nutrition: {
      calorie: log.calorie,
      protein: log.protein,
      carbohydrate: log.carbohydrate,
      fat: log.fat,
      water: log.water,
      fiber: log.fiber,
      labelCategory: log.labelCategory,
      originRegion: log.originRegion,
    },
    totalNutrition: {
      calorie: log.totalCalorie,
      protein: log.totalProtein,
      carbohydrate: log.totalCarbohydrate,
      fat: log.totalFat,
      water: log.totalWater,
      fiber: log.totalFiber,
    }
  };
};

// helper function untuk format response meal
export const formatMealResponse = (meal) => {
  return {
    id: meal.id,
    userId: meal.userId,
    predictLogId: meal.predictLogId,
    mealType: meal.mealType,
    foodName: meal.foodName,
    confidenceScore: meal.confidentScore,
    imageUrl: meal.imageUrl,
    portion: meal.portion,
    createdAt: meal.createdAt,
    updatedAt: meal.updatedAt,
    nutrition: {
      calorie: meal.calorie,
      protein: meal.protein,
      carbohydrate: meal.carbohydrate,
      fat: meal.fat,
      water: meal.water,
      fiber: meal.fiber,
      labelCategory: meal.labelCategory,
      originRegion: meal.originRegion,
    },
    totalNutrition: {
      calorie: meal.totalCalorie,
      protein: meal.totalProtein,
      carbohydrate: meal.totalCarbohydrate,
      fat: meal.totalFat,
      water: meal.totalWater,
      fiber: meal.totalFiber,
    }
  };
};