import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddPatientForm, { PatientFormValues } from "./AddPatientForm";
import AddEntryForm, {EntryFormInput} from "./AddEntryForm";

interface PropsPatient {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: PropsPatient) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddPatientModal;

interface PropsEntry {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryFormInput) => void;
    error?: string;
    patientId: string;
}

export const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, patientId }: PropsEntry) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>New Entry</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
            <AddEntryForm patientId={patientId} onSubmit={onSubmit} onCancel={onClose} />
        </DialogContent>
    </Dialog>
);