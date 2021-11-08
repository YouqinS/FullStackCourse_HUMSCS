import React, {useState} from 'react'
import ContactInfo from "./ContactInfo";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearchTerm, setNewSearchTerm] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    const personsToShow = isSearching
        ? persons.filter(p => p.name.toLowerCase().includes(newSearchTerm.toLowerCase()))
        : persons

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchTermChange = (event) => {
        setIsSearching(true)
        setNewSearchTerm(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()

        const compareValue = () => {
            return p => p.name === newName && p.number === newNumber;
        }

        if (persons.some(compareValue())) {
            window.alert(`${newName} is already added to phonebook`);
        } else {
            const personObj = {
                name: newName,
                number: newNumber
            }
            let addedNewPerson = persons.concat(personObj);
            setPersons(addedNewPerson)
        }
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <div>filter shown with: <input value={newSearchTerm} onChange={handleSearchTermChange}/></div>

            <h2>add a new</h2>
            <form onSubmit={addName}>
                <div>name: <input value={newName} onChange={handleNameChange}/></div>
                <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
                <div>
                    <button type="submit">add</button>
                </div>

            </form>

            <h2>Numbers</h2>
            <div>
                {personsToShow.map(person =>
                    <ContactInfo key={person.name} contact={person}/>
                )}
            </div>
        </div>
    )
}

export default App
