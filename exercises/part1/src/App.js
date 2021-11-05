import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const contents = [part1, part2, part3]
  const total_exercises = part1.exercises + part2.exercises + part3.exercises

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
  const parts_exercises = props.parts_exercises

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
    return (
      <p>Number of exercises {props.total}</p>
    )
  }

  return (
    <div>
      <Header course ={course}/>
      <Content parts_exercises={contents}/>
      <Total total={total_exercises}/>
    </div>
  )
}

export default App
