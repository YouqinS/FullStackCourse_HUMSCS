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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return res.send(calculateExercises(daily_exercises, target));
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
