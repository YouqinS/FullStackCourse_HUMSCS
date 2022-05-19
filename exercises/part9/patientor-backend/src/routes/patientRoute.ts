import express from 'express';
import patientService from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientDataNoSsn())
})

router.post('/', (_req, res) => {
    res.send('create entry of patient data');
});

export default router;
