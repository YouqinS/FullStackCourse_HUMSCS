// new types
export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

export interface CoursePartBaseDescription extends CoursePartBase {
    description: string
}

export interface CourseNormalPart extends CoursePartBaseDescription {
    type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartBaseDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}

export interface CourseRequirementsPart extends CoursePartBaseDescription {
    type: 'special';
    requirements: string[];
}


export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementsPart;

