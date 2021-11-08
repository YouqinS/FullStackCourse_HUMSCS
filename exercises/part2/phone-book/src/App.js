import React, { useState } from 'react'
import ContactInfo from "./ContactInfo";

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }


    const addName = (event) => {
        event.preventDefault()

        if (persons.some(p => p.name === newName)) {
            window.alert(`${newName} is already added to phonebook`);
        } else {
            const personObj = {
                name: newName,
            }
            let addedNewPerson = persons.concat(personObj);
            setPersons(addedNewPerson)
        }
        setNewName('')
    }

    return (
      <div>
        <h2>Phonebook</h2>

        <form onSubmit={addName}>
          <div>
            name: <input value={newName} onChange={handleNameChange}/>
          </div>

          <div>
            <button type="submit">add</button>
          </div>
        </form>

        <h2>Numbers</h2>
          <div>
              <ul>
                  {persons.map(person =>
                      <ContactInfo key={person.name} contact={person}/>
                  )}
              </ul>
          </div>
      </div>
  )
}

export default App
