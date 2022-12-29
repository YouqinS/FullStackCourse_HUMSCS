import {Diagnosis, HospitalEntry} from "../types";

const EntryHospital = ({
                           entry,
                           diagnoses,
                       }: {
    entry: HospitalEntry;
    diagnoses: Diagnosis[] | undefined;
}) => {
    // const dischargeIcon = <DirectionsRunIcon />;
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
            <p>Description: {entry.description}</p>
            <p>Diagnosed by: <b>{entry.specialist}</b></p>
            <p>Discharge date: {entry.discharge.date}</p>
            <p>Criteria: {entry.discharge.criteria}</p>

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

export default EntryHospital;