import { useStateValue } from "../state";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "@material-ui/core";

import { DiagnosisSelection, TextField } from "./FormField";
import {Entry} from "../types";

const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
};

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryFormInput = UnionOmit<Entry, "id">;
interface Props {
    onSubmit: (values: EntryFormInput) => void;
    onCancel: () => void;
    patientId: string;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnosis }] = useStateValue();
    return (
        <Formik
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                type: "OccupationalHealthcare",
                employerName: "",
                sickLeave: { startDate: "", endDate: "" },
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const dateError = "Date format should be YYYY-MM-DD";
                const errors: { [field: string]: string } = {};
                if (!values.description) errors.description = requiredError;
                if (!isDate(values.date)) errors.date = dateError;
                if (!values.specialist) errors.specialist = requiredError;
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="description"
                            placeholder="description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="date"
                            placeholder="date"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="specialist"
                            placeholder="specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="employerName"
                            placeholder="employerName"
                            name="employerName"
                            component={TextField}
                        />
                        <Field
                            label="startDate"
                            placeholder="startDate"
                            name="sickLeave.startDate"
                            component={TextField}
                        />
                        <Field
                            label="endDate"
                            placeholder="endDate"
                            name="sickLeave.endDate"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosis)}
                        />
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;