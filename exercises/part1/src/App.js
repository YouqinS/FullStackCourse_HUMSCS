import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts_exercises = {[part1]: exercises1, [part2]: exercises2, [part3]: exercises3};
  
  const Header = (props) => {
    return (
    <h1>{props.course}</h1>
    )
  }

  const Content = (props) => {
    const parts_exercises = props.exercises
   
    return (
      <div>
        {
        Object.keys(parts_exercises).map((key, index) => ( 
          <p key={index}>{key} {parts_exercises[key]}</p> 
        ))
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
      <Content exercises={parts_exercises}/>
      <Total total={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App