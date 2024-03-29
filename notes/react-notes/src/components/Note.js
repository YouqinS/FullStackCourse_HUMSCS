import React from 'react'

const Note = (props) => {

    const {note, toggleImportance} = props
  const label = note.important ? 'make not important' : 'make important'
  return (
    <li className='note'>
      {note.content}
      <button onClick={toggleImportance}> {label} </button>
    </li>
  )
}
export default Note
