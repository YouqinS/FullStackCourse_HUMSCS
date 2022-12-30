import diagnoses from "../../data/diagnoses";
import {Diagnosis} from "../types";

const getDiagnoseData = (): Array<Diagnosis> => {
    return diagnoses;
};

export default {
    getDiagnoseData
};
