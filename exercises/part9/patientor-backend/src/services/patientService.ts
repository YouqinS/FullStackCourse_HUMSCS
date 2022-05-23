import { v4 as uuid } from 'uuid';
import patients from "../../data/patients";
import {NewPatientEntry, Patient, PatientNoSsn} from "../types";

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

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
        id:  uuid(),
        ...entry
    }
    patients.push(newPatient);
    return newPatient;
}

export default {
    getPatientData,
    getPatientDataNoSsn,
    addPatient
}
