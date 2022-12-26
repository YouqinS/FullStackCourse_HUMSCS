import express from 'express';
import {calculateBmi} from "./bmiCalculator";
import {calculateExercises} from "./exerciseCalculator";

//const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});


//http://localhost:3000/bmi?height=180&weight=74
//{
// "weight": 74,
// "height": 180,
// "bmi": "Normal (healthy weight)"
// }
app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    let response = {};
    if (isNaN(height) || isNaN(weight)) {
        response = {
            error: "malformatted parameters"
        };
    } else {
        const bmi = calculateBmi(height, weight);
        response = {
            weight: weight,
            height: height,
            bmi: bmi
        };
    }

    res.send(response);
});

//test in postman:
//request url: http://localhost:3000/exercises
//body:
// {
//    "daily_exercises": [3, 0, 2, 4.5, 0, 3, 1],
//    "target": 2
// }
//response:
// {
//     "periodLength": 7,
//     "trainingDays": 5,
//     "success": false,
//     "rating": 1.9285714285714286,
//     "ratingDescription": "good, but can be better",
//     "target": 2,
//     "average": 1.9285714285714286
// }
app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;
    if (!daily_exercises || !target) {
        return res.send({
            error: "parameters missing"
        }).status(400);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    } else if (isNaN(Number(target)) || !Array.isArray(daily_exercises) || daily_exercises.some((x: any) => isNaN(Number(x)))) {
        return res.send({
            error: "malformatted parameters"
        }).status(400);
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return res.send(calculateExercises(daily_exercises, target));
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
