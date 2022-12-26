import express from 'express';
import diaryService from "../services/diaryService";
import toNewDiaryEntry from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    //res.send('Fetching all diaries!');
    res.send(diaryService.getNonSensitiveEntries());
});


router.get('/:id', (_req, res) => {
    //res.send('Fetching all diaries!');
    const diary = diaryService.findById(Number(_req.params.id));
    if (diary) {
        res.send(diary);
    } else {
        res.send('no diary with provided id was found').status(404);
    }
});

router.post('/', (req, res) => {

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newDiaryEntry = toNewDiaryEntry(req.body);
        const newDiary = diaryService.addDiary(newDiaryEntry);
        res.json(newDiary);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
