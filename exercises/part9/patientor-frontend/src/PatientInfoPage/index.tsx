import {addEntry, setDiagnosisList, useStateValue} from "../state";
import {useParams} from "react-router-dom";
import {Diagnosis, Entry, Patient} from "../types";
import { useEffect, useState } from "react";
import {apiBaseUrl} from "../constants";
import axios from "axios";
import {setGetPatient} from "../state";
import EntryDetails from "./EntryIDetails";
import {EntryFormInput} from "../AddPatientModal/AddEntryForm";
import {AddEntryModal} from "../AddPatientModal";
import {Button} from "@material-ui/core";

const PatientInfoPage = () => {
    const [{patients}, dispatch] = useStateValue();
    const {id} = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | undefined>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[] | undefined>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    useEffect(() => {
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
                const {data: diagnoses} = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
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
            if (patients[id] && patients[id].ssn) {
                setPatient(patients[id]);
            } else {
                void getDiagnoses();
                void getPatient();
            }
        }
    }, [id]);

    const submitNewEntry = async (values: EntryFormInput) => {
        if (patient) {
            try {
                const {
                    data: { entry },
                } = await axios.post<{ patientId: string; entry: Entry }>(`${apiBaseUrl}/patients/${patient.id}/entries`,
                    values
                );
                dispatch(addEntry(patient.id, entry));
                closeModal();
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    console.error(e?.response?.data || "Unrecognized axios error");
                    setError(
                        String(e?.response?.data?.error) || "Unrecognized axios error"
                    );
                } else {
                    console.error("Unknown error", e);
                    setError("Unknown error");
                }
            }
        }
    };

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
                    <AddEntryModal
                        modalOpen={modalOpen}
                        onSubmit={submitNewEntry}
                        error={error}
                        onClose={closeModal}
                        patientId={patient.id}
                    />
                    <Button variant="contained" onClick={() => openModal()}>
                        Add New Entry
                    </Button>
                </div>
                :
                <h4>loading ...</h4>
            }
        </div>
    );
};

export default PatientInfoPage;