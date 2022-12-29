import { State } from "./state";
import {Diagnosis, Patient} from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
  type: "GET_PATIENT";
  payload: Patient;
  }
  | {
  type: "SET_DIAGNOSIS_LIST";
  payload: Diagnosis[];
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_PATIENT":
      return {
        ...state,
        patientInfo: {
          ...state.patientInfo,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
              (memo, diagnosis) => ({...memo, [diagnosis.code]: diagnosis}),
              {}
          ),
          ...state.diagnosis,
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patients };
};

export const setGetPatient = (patient: Patient): Action => {
  return {
    type: "GET_PATIENT",
    payload: patient,
  };
};

export const setDiagnosisList = (diagnosisCodes: Diagnosis[]): Action => {
  return { type: 'SET_DIAGNOSIS_LIST', payload: diagnosisCodes };
};