import diagnoses from "../../data/diagnoses";
import {Diagnose} from "../types";

const getDiagnoseData = (): Array<Diagnose> => {
    return diagnoses;
};

export default {
    getDiagnoseData
}
