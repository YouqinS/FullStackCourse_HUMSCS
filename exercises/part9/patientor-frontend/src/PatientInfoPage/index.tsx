import {setDiagnosisList, useStateValue} from "../state";
import {useParams} from "react-router-dom";
import {Diagnosis, Patient} from "../types";
import React from "react";
import {apiBaseUrl} from "../constants";
import axios from "axios";
import {setGetPatient} from "../state";
import EntryDetails from "./EntryIDetails";

const PatientInfoPage = () => {
    const [{patientInfo}, dispatch] = useStateValue();
    const {id} = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient | undefined>();
    const [diagnoses, setDiagnoses] = React.useState<Diagnosis[] | undefined>();

    React.useEffect(() => {
        const getPatient = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(setGetPatient(patient));
                setPatient(patient);
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    console.error(e?.response?.data || "Unrecognized axios error");
                } else {
                    console.error("Unknown error", e);
                }
            }
        };

        const getDiagnoses = async () => {
            try {
                const { data: diagnoses } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses` );
                dispatch(setDiagnosisList(diagnoses));
                setDiagnoses(diagnoses);
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    console.error(e?.response?.data || 'Unrecognized axios error');
                } else {
                    console.error('Unknown error', e);
                }
            }
        };

        if (id) {
            if (patientInfo[id]) {
                setPatient(patientInfo[id]);
                void getDiagnoses();
            } else {
                void getPatient();
            }
        }
    }, [id, dispatch, patientInfo]);

    return (
        <div>
            {patient ?
                <div>
                    <h3>{patient.name}</h3>
                    <p>Gender: {patient.gender} </p>
                    <p>ssn: {patient.ssn}</p>
                    <p>Occupation: {patient.occupation}</p>
                    <div>
                        <h4>Entries</h4>
                        {patient.entries?.map((entry) => (
                                <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>
                            )
                        )}
                    </div>
                </div> :
                <h4>loading ...</h4>
            }
        </div>
    );
};

export default PatientInfoPage;