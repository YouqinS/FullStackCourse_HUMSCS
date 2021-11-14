import React, {useState} from "react";
import Contacts from "../services/Contacts";

const ContactForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addContact = (event) => {
        event.preventDefault()

        const compareValue = () => {
            return p => p.name === newName && p.number === newNumber;
        }

        if (persons.some(compareValue())) {
            window.alert(`${newName} is already added to phonebook`);
        } else if ((newName && newName.trim()) && (newNumber && newNumber.trim())) {
            const personObj = {
                name: newName,
                number: newNumber
            }
            Contacts.create(personObj).then(
                response => {
                    setPersons(persons.concat(response))
                    setNewName('')
                    setNewNumber('')
                }
            )
        }
    }

    return (
        <div>
            <form onSubmit={addContact}>
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
