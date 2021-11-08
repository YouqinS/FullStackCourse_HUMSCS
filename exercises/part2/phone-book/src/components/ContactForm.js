import React, {useState} from "react";

const ContactForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
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
            <form onSubmit={addName}>
                <div>name: <input value={newName} onChange={handleNameChange}/></div>
                <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default ContactForm
