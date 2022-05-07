export const calculateBmi = (heightCm: number, weightKg: number): String => {
    if (heightCm <= 0 || weightKg <= 0) {
        throw new Error('Height and weight must be bigger 0');
    }
   const bmi = weightKg / Math.pow(heightCm / 100, 2);
   let message = "";
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

//console.log(calculateBmi(180, 74))

interface UserInputs {
    heightCm: number;
    weightKg: number;
}

const parseArguments = (args: Array<string>): UserInputs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            heightCm: Number(args[2]),
            weightKg: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

try {
    const {heightCm, weightKg} = parseArguments(process.argv);
    console.log(calculateBmi(heightCm, weightKg))
} catch (error: unknown) {
    let errorMessage = 'Error: '
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
