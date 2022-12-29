import express from 'express';
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientDataNoSsn());
});

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = toNewPatientEntry(req.body);
        const newPatient = patientService.addPatient(newPatientEntry);
        res.json(newPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const patient = patientService.findById(id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).send("no patient found with provided ID: " + id);
    }
});

export default router;
