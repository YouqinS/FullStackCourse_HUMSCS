import {DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry} from '../types';
import diaries from "../../data/diaries";

const getEntries = (): Array<DiaryEntry> => {
    return diaries;
};

/*
const getNonSensitiveEntries = (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
        return [];
    };
*/

/*
const getNonSensitiveEntries = (): Omit<DiaryEntry, 'comment'>[] => {
    return [];
};
*/

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({id, date, weather, visibility}) => ({
        id, date, weather, visibility
    }));
};

const findById = (id: number): DiaryEntry | undefined => {
    return diaries.find(d => id === d.id);
};

const addDiary = (entry: NewDiaryEntry):DiaryEntry => {
    const newDiary = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...entry
    };
    diaries.push(newDiary);
    return newDiary;
};


export default {
    getEntries,
    getNonSensitiveEntries,
    findById,
    addDiary
};
