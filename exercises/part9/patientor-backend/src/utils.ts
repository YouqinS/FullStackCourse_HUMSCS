import {BaseEntry, Diagnosis, Entry, Gender, HealthCheckRating, NewPatientEntry} from "./types";
import {v4 as uuid} from "uuid";

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: PatientFields): NewPatientEntry => {
  return {
      name: parseString(name, "name"),
      dateOfBirth: parseDate(dateOfBirth, "date of birth"),
      ssn: parseSsn(ssn),
      gender: parseGender(gender),
      occupation: parseString(occupation, "occupation"),
      entries: []
  };
};

export const parseString= (value: unknown, label: string): string => {
    if (!value || !isString(value)) {
        throw new Error("Incorrect or missing " + label + ": " + value);
    }

    return value;
};

export const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error(`Incorrect ${JSON.stringify(ssn)}`);
    }
    return ssn;
};

export const parseDate = (date: unknown, label: string): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing " + label + ": " + date);
    }
    return date;
};

export const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};

export const isNumber = (x: unknown): x is number => {
    return typeof x === "number" || x instanceof Number;
};

export const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

export const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};

export default toNewPatientEntry;


type EntryFields = {
    description: unknown;
    date: unknown;
    specialist: unknown;
    type: unknown;
    diagnosisCodes?: unknown;
    healthCheckRating?: unknown;
    employerName?: unknown;
    sickLeave?: unknown;
    discharge?: unknown;
};

export const isDiagnosisCode = (x: unknown): x is Diagnosis["code"] => {
    return typeof x === "string" || x instanceof String;
};

export const parseDiagnosisCode = (
    diagnosisCode: unknown
): Diagnosis["code"] => {
    if (!diagnosisCode || !isDiagnosisCode(diagnosisCode)) {
        throw new Error("Incorrect diagnosisCode");
    }
    return diagnosisCode;
};

const parseDiagnosisCodes = (
    diagnosisCodes: Array<unknown>
): Array<Diagnosis["code"]> => {
    return diagnosisCodes.map((diagnosisCode) =>
        parseDiagnosisCode(diagnosisCode)
    );
};

const parseHealthCheckRating = (
    healthCheckRating: unknown
): HealthCheckRating => {
    if (
        !isNumber(healthCheckRating) ||
        healthCheckRating < 0 ||
        healthCheckRating > 4
    ) {
        throw new Error("Incorrect or missing healthCheckRating");
    }
    return healthCheckRating as HealthCheckRating;
};

const parseDischarge = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    discharge: any
): {
    date: string;
    criteria: string;
} => {
    if (
        !discharge ||
        !discharge.date ||
        !isString(discharge.date) ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        !isDate(discharge.date) ||
        !discharge.criteria ||
        !isString(discharge.criteria)
    ) {
        throw new Error("Incorrect or missing discharge");
    }
    return discharge as {
        date: string;
        criteria: string;
    };
};

const parseSickLeave = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sickLeave: any
): { startDate: string; endDate: string } => {
    if (sickLeave.startDate && sickLeave.endDate) {
        return {
            startDate: parseDate(sickLeave.startDate, "startDate"),
            endDate: parseDate(sickLeave.endDate, "endDate"),
        };
    } else throw new Error("incorrect sickLeave");
};

export const toNewEntry = ({
                        description,
                        date,
                        specialist,
                        type,
                        diagnosisCodes,
                        healthCheckRating,
                        employerName,
                        sickLeave,
                        discharge,
                    }: EntryFields): Entry => {
    const parsedType = parseString(type, "type");
    const parsedDescription = parseString(description, "description");
    const parsedDate = parseDate(date, "date");
    const parsedSpecialist = parseString(specialist, "specialist");
    let entry: BaseEntry = {
        id: uuid(),
        description: parsedDescription,
        date: parsedDate,
        specialist: parsedSpecialist,
    };

    if (diagnosisCodes) {
        entry = {
            ...entry,
            diagnosisCodes: parseDiagnosisCodes(diagnosisCodes as Array<unknown>),
        };
    }
    switch (parsedType) {
        case "HealthCheck":
            return {
                ...entry,
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(healthCheckRating),
            };
        case "OccupationalHealthcare":
            const returnEntry: Entry = {
                ...entry,
                type: "OccupationalHealthcare",
                employerName: parseString(employerName, "employerName"),
            };
            if (sickLeave) {
                return { ...returnEntry, sickLeave: parseSickLeave(sickLeave) };
            } else {
                return returnEntry;
            }
        case "Hospital":
            return {
                ...entry,
                type: "Hospital",
                discharge: parseDischarge(discharge),
            };
        default:
            throw new Error("Incorrect Entry Type");
    }
};