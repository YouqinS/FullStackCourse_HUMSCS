import express from 'express';
import diagnoseService from "../services/diagnoseService";


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnoseService.getDiagnoseData())
})

router.post('/', (_req, res) => {
    res.send('create entry of diagnose data');
});

export default router;
