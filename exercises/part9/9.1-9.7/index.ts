import express from 'express';

//const express = require('express');
const app = express();
const PORT = 3000;

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
