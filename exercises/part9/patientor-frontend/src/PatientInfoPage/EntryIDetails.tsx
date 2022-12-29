import {Diagnosis, Entry} from "../types";
import EntryHealthCheck from "./EntryHealthCheck";
import EntryHospital from "./EntryHospital";
import EntryOccupationalHealthcare from "./EntryOccupationalHealthCheck";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails = ({
                          entry,
                          diagnoses,
                      }: {
    entry: Entry;
    diagnoses: Diagnosis[] | undefined;
}) => {
    switch (entry.type) {
        case "Hospital":
            return <EntryHospital entry={entry} diagnoses={diagnoses} />;
        case "OccupationalHealthcare":
            return <EntryOccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
        case "HealthCheck":
            return <EntryHealthCheck entry={entry} diagnoses={diagnoses} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;