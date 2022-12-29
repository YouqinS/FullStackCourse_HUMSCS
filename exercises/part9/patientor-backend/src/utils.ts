import {Gender, NewPatientEntry} from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatientEntry => {
  return {
      name: parseName(name),
      dateOfBirth: parseDateOfBirth(dateOfBirth),
      ssn: parseSsn(ssn),
      gender: parseGender(gender),
      occupation: parseOccupation(occupation),
      entries: []
  };
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name: " + name);
    }

    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error(`Incorrect ${JSON.stringify(ssn)}`);
    }
    return ssn;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error("Incorrect or missing date of birth: " + dateOfBirth);
    }
    return dateOfBirth;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation: " + occupation);
    }

    return occupation;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};


const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};

export default toNewPatientEntry;
