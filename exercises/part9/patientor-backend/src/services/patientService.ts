import patients from "../../data/patients";
import {Patient, PatientNoSsn} from "../types";

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


export default {
    getPatientData,
    getPatientDataNoSsn
}
