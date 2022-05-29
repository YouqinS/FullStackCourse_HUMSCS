import React from 'react';

interface PartsProps {
    courseParts: { name: string; exerciseCount: number; }[];
}

const Content = ({ courseParts }: PartsProps) => {
    return (
        <div>
            {courseParts.map((part) =>
                <p key={part.name}>
                    {part.name} {part.exerciseCount}
                </p>
            )}
        </div>
    )
};

export default Content;
