interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (exerciseRecords: number[], target: number): Result => {
    const totalDays = exerciseRecords.length;
    const totalHours = exerciseRecords.reduce((accumulator, a) => accumulator + a, 0);
    const avg = totalDays == 0 ? 0 : totalHours / totalDays;
    const isSuccess = avg >= target;

    return {
        periodLength: totalDays,
        trainingDays: exerciseRecords.filter(x => x > 0).length,
        success: isSuccess,
        rating: avg,
        ratingDescription: isSuccess ? "very good" : "good, but can be better",
        target: target,
        average: avg
    };
};

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));


interface inputs {
    exerciseRecords: number[];
    target: number;
}

const parseInputs = (args: Array<string>): inputs => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const records = [];

    for (let i = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error("Provided value '" + args[i] + "' is not a number!");
        } else {
            records.push(Number(args[i]));
        }
    }

    return {
        exerciseRecords: records.slice(0, -1),
        target: Number(records.at(-1))
    };
};

try {
    const {exerciseRecords, target} = parseInputs(process.argv);
    console.log(calculateExercises(exerciseRecords, target));
} catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
