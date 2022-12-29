import {Diagnosis, OccupationalHealthcareEntry} from "../types";

const EntryOccupationalHealthcare = ({
                                    entry,
                                    diagnoses,
                                }: {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnosis[] | undefined;
}) => {

    return (
        <div
            key={entry.id}
            style={{
                padding: "6px",
                border: "1px solid black",
                borderRadius: "5px",
                margin: "5px",
            }}
        >
            <b>{entry.date}: {entry.type}</b>
            <p>Employer: {entry.employerName}</p>
            <p>Description: {entry.description}</p>
            <p>Diagnosed by: <b>{entry.specialist}</b></p>

            {!entry.sickLeave ? null : (
                <>
                    <b>sick leave:</b> {entry.sickLeave?.startDate}{" - "} {entry.sickLeave?.endDate}
                    <br></br>
                </>
            )}

            <p><b>Diagnoses:</b></p>
            {
                <ul>
                    {entry.diagnosisCodes?.map((code: string) => (
                        <li key={code}>
                            {code}: {" "}
                            {diagnoses?.map((diagnose) =>
                                diagnose.code === code ? diagnose.name : null
                            )}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};

export default EntryOccupationalHealthcare;