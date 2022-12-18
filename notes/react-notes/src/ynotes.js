import React, { useState } from 'react'

//conditional rendering.
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
          the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
        button press history: {props.allClicks.join(' ')}
    </div>
  )
}

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
const Hello = (props) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }
  //one line
  const by = () => new Date().getFullYear() - props.age

  //assign props to variables
  const name = props.name
  const age = props.age
  //Destructuring makes the assignment of variables even easier
  const { name1, age1 } = props

  return (
    <div>
      <p>
          Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

//Destructuring props and pass to function as variables
const Hello1 = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
          Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const App1 = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  //const parts_exercises = new Map([part1, exercises1], [part2, exercises2], [part3, exercises3])

  const parts_exercises = { [part1]: exercises1, [part2]: exercises2, [part3]: exercises3 }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //array
  const t = [1, -1, 3]
  t.push(5)
  console.log(t.length) // 4 is printed
  console.log(t[1])     // -1 is printed

  t.forEach(value => {
    console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line
  })

  const t2 = t.concat(5)
  const m1 = t.map(value => value * 2)
  const m2 = t.map(value => '<li>' + value + '</li>')

  //destructuring assignment.
  const tt = [1, 2, 3, 4, 5]
  const [first, second, ...rest] = tt
  console.log(first, second)  // 1, 2 is printed
  console.log(rest)          // [3, 4, 5] is printed

  //Objects
  const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
  }
  console.log(object1.name)         // Arto Hellas is printed
  const fieldName = 'age'
  console.log(object1[fieldName])   // 35 is printed

  //add properties to an object on the fly
  object1.address = 'Helsinki'
  object1['secret number'] = 12341

  const object2 = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
  }

  const object3 = {
    name: {
      first: 'Dan',
      last: 'Abramov',
    },
    grades: [2, 3, 5, 3],
    department: 'Stanford University',
  }


  // arrow functions
  const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
  }
  const result = sum(1, 5)
  console.log(result)

  const square = p => {
    console.log(p)
    return p * p
  }
  const square1 = p => p * p
  const t1 = [1, 2, 3]
  const tSquared = t.map(p => p * p)

  // tSquared is now [1, 4, 9]

  function product(a, b) {
    return a * b
  }

  const result1 = product(2, 6)
  // result is now 12

  const average = function (a, b) {
    return (a + b) / 2
  }

  const result2 = average(2, 5)// result is now 3.5

  //Object methods and "this"
  const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
    greet: function () {
      console.log('hello, my name is ' + this.name)
    },
    doAddition: function (a, b) {
      console.log(a + b)
    },
  }

  arto.greet()  // "hello, my name is Arto Hellas"
  //Methods can be assigned to objects even after the creation of the object:
  arto.growOlder = function () {
    this.age += 1
  }
  console.log(arto.age)   // 35 is printed
  arto.growOlder()
  console.log(arto.age)   // 36 is printed

  arto.doAddition(1, 4)        // 5 is printed

  const referenceToAddition = arto.doAddition
  referenceToAddition(10, 15)   // 25 is printed

  arto.greet()       // "hello, my name is Arto Hellas" gets printed
  const referenceToGreet = arto.greet
  //When calling the method through a reference, the method loses knowledge of what the original "this"
  // referenceToGreet() // prints "hello, my name is undefined"
  //to fix this:
  setTimeout(arto.greet.bind(arto), 1000)

  //Classes
  class Person {
    constructor(name, age) {
      this.name = name
      this.age = age
    }

    greet() {
      console.log('hello, my name is ' + this.name)
    }
  }

  const adam = new Person('Adam Ondra', 35)
  adam.greet()

  const janja = new Person('Janja Garnbret', 22)
  janja.greet()

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  setTimeout(
    () => setCounter(counter + 1),
    3000
  )
  //hooks may only be called from the inside of a function body that defines a React component
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  //conditional rendering.
  const History = (props) => {
    if (props.allClicks.length === 0) {
      return (
        <div>
            the app is used by pressing the buttons
        </div>
      )
    }
    return (
      <div>
          button press history: {props.allClicks.join(' ')}
      </div>
    )
  }

  const showResult = () => {
    return (
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <p>{allClicks.join(' ')}</p>
        <History allClicks={allClicks}/>
      </div>
    )
  }
  //function that returns a function.
  const hello = () => {
    const handler = () => console.log('hello world')
    return handler
  }

  return (
    <div>
      <Header course={course}/>
      <Content exercises={parts_exercises}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

//array of objects
const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]
{notes[0].content}
notes.map(note => <li key={note.id}>{note.content}</li>)//creates a new array populated with the results of calling a provided function on every element in the calling array.
notes.forEach(note => <li key={note.id}>{note.content}</li>)//executes a provided function once for each array element

const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note}/>
        )}
      </ul>
    </div>
  )
}
export default App1


