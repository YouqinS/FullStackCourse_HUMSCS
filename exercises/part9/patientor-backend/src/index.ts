import express from 'express';
import diagnoseRoute from "./routes/diagnoseRoute";
import patientRoute from './routes/patientRoute';

const app = express();
app.use(express.json());
app.use('/api/diagnoses', diagnoseRoute);
app.use('/api/patients', patientRoute);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
