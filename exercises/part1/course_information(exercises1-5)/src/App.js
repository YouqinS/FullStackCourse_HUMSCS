import React from 'react'

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    const Header = (props) => {
        return (
            <h1>{props.course}</h1>
        )
    }

    const Part = (props) => {
        return (
            <p>
                {props.part} {props.exercise}
            </p>
        )
    }

    const Content = (props) => {
        const parts_exercises = props.parts

        return (
            <div>
                {
                    //parts_exercises.map(el => <p key={el.name} > {el.name} {el.exercises}</p>)
                    parts_exercises.map(el => <Part part={el.name} exercise={el.exercises}/>)
                }
            </div>
        )
    }

    const Total = (props) => {
        const total_exercises = props.parts.reduce(function (total, currentValue){
            return total + currentValue.exercises;}, 0)
        return (
            <p>Number of exercises {total_exercises}</p>
        )
    }

    return (
        <div>
            <Header course ={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default App
