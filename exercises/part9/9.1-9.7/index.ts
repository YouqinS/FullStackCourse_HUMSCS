import express from 'express';
import {calculateBmi} from "./bmiCalculator";

//const express = require('express');
const app = express();
const PORT = 3000;

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
});


app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    let response = {}
    if (isNaN(height) || isNaN(weight)) {
        response = {
            error: "malformatted parameters"
        }
    } else {
        const bmi = calculateBmi(height, weight);
        response = {
            weight: weight,
            height: height,
            bmi: bmi
        };
    }

    res.send(response)
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
