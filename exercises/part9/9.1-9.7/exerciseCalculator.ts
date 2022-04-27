interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (exerciseRecords: number[], target: number) : Result => {
    const totalDays = exerciseRecords.length
    const totalHours = exerciseRecords.reduce((accumulator, a) => accumulator + a, 0);
    const avg = totalHours / totalDays
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
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
