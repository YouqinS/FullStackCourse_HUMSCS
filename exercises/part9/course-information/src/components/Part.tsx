import {CoursePart, CoursePartBaseDescription} from "../utils/Types";

const assertNever = (value: never): never => {
    throw new Error (`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    const nameAndExerciseCount = (coursePart: CoursePart) => (
        <div>
            <b>{coursePart.name} </b>
            <span>{coursePart.exerciseCount}</span>
        </div>
    );

    const description = (coursePart: CoursePartBaseDescription) => (
        <div>
            <p><i>{coursePart.description}</i></p>
        </div>
    );


    switch (coursePart.type) {
            case "normal":
                return (
                    <div>
                        {nameAndExerciseCount(coursePart)}
                        {description(coursePart)}
                    </div>
                );
            case "groupProject":
                return (
                    <div>
                        {nameAndExerciseCount(coursePart)}
                        <div><p>project exercises {coursePart.groupProjectCount}</p></div>
                    </div>
                );
            case "submission":
                return (
                    <div>
                        {nameAndExerciseCount(coursePart)}
                        {description(coursePart)}
                        <div><p>{coursePart.exerciseSubmissionLink}</p></div>
                    </div>
                );
        case "special":
            return (<div>
                {nameAndExerciseCount(coursePart)}
                {description(coursePart)}
                <div><p>required skills: {coursePart.requirements.join(", ")}</p></div>
            </div>);
            default:
                return assertNever(coursePart);
        }
};
export default Part;