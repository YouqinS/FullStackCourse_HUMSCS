const calculateBmi = (heightCm: number, weightKg: number): String => {
    if (heightCm <= 0 || weightKg <= 0) {
        throw new Error('Height and weight must be bigger 0');
    }
   const bmi = weightKg / Math.pow(heightCm / 100, 2);
   let message = "";
   message = "";
    if (bmi >= 40) {
        message = "Obese (Class III)";
    } else if (bmi >= 35) {
        message = "Obese (Class II)";
    } else if (bmi >= 30) {
        message = "Obese (Class I)";
    } else if (bmi >= 25) {
        message = "Overweight (Pre-obese)";
    } else if (bmi >= 18.5) {
        message = "Normal (healthy weight)";
    } else if (bmi >= 17) {
        message = "Underweight (Mild thinness)";
    } else if (bmi >= 16) {
        message = "Underweight (Moderate thinness)";
    } else {
        message = "Underweight (Severe thinness)";
    }
    return message;
}

console.log(calculateBmi(180, 74))
