// helper function untuk menghitung BMI
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
    confidenceScore: log.confidenceScore,
    imageUrl: log.imageUrl,
    portion: log.portion,
    createdAt: log.createdAt,
    updatedAt: log.updatedAt,
    nutrition: {
      servingSizeG: log.servingSizeG,
      servingDescription: log.servingDescription,
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
      calorie: ((log.calorie || 0) * (log.portion || 1)).toFixed(2),
      protein: ((log.protein || 0) * (log.portion || 1)).toFixed(2),
      carbohydrate: ((log.carbohydrate || 0) * (log.portion || 1)).toFixed(2),
      fat: ((log.fat || 0) * (log.portion || 1)).toFixed(2),
      water: log.water != null ? (log.water * (log.portion || 1)).toFixed(2) : null,
      fiber: log.fiber != null ? (log.fiber * (log.portion || 1)).toFixed(2) : null,
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
    confidenceScore: meal.confidenceScore,
    imageUrl: meal.imageUrl,
    portion: meal.portion,
    createdAt: meal.createdAt,
    updatedAt: meal.updatedAt,
    nutrition: {
      servingSizeG: meal.servingSizeG,
      servingDescription: meal.servingDescription,
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
      calorie: ((meal.calorie || 0) * (meal.portion || 1)).toFixed(2),
      protein: ((meal.protein || 0) * (meal.portion || 1)).toFixed(2),
      carbohydrate: ((meal.carbohydrate || 0) * (meal.portion || 1)).toFixed(2),
      fat: ((meal.fat || 0) * (meal.portion || 1)).toFixed(2),
      water: meal.water != null ? (meal.water * (meal.portion || 1)).toFixed(2) : null,
      fiber: meal.fiber != null ? (meal.fiber * (meal.portion || 1)).toFixed(2) : null,
    }
  };
};