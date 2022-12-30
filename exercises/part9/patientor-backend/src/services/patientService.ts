import {v4 as uuid} from 'uuid';
import patients from "../../data/patients";
import {Entry, NewPatientEntry, Patient, PatientNoSsn} from "../types";

const getPatientData = (): Array<Patient> => {
    return patients;
};

const getPatientDataNoSsn = (): Array<PatientNoSsn> => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const findById = (id: string): Patient | undefined => {
    return patients.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
        id:  uuid(),
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (id: string, entry: Entry): Entry => {
    const patient: Patient | undefined = findById(id);
    if (!patient) {
        throw new Error("no patient found with provided ID: " + id);
    }

    patient.entries.push(entry);
    return entry;
};

export default {
    getPatientData,
    getPatientDataNoSsn,
    addPatient,
    findById,
    addEntry
};
