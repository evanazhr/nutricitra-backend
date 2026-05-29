
export const calculateBMI = (height, weight) => {
  if (!height || !weight || height <= 0 || weight <= 0) {
    return { bmi: 0, category: "Data tidak valid" };
  }

  const heightInMeters = height / 100;

  const bmi = weight / (heightInMeters * heightInMeters);

  const bmiRounded = parseFloat(bmi.toFixed(1));

  return bmiRounded
};