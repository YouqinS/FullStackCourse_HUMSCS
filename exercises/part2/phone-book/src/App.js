import React, {useState, useEffect} from 'react'
import ContactInfo from "./components/ContactInfo";
import FilterContact from "./components/FilterContact";
import ContactForm from "./components/ContactForm";
import axios from "axios";

const App = () => {
    const [contacts, setContacts] = useState([])

    const [newSearchTerm, setNewSearchTerm] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    const contactsToShow = isSearching
        ? contacts.filter(p => p.name.toLowerCase().includes(newSearchTerm.toLowerCase()))
        : contacts

    const handleSearchTermChange = (event) => {
        setIsSearching(true)
        setNewSearchTerm(event.target.value)
    }

    useEffect(() => {
        axios.get("http://localhost:3001/persons")
            .then(response => {
                setContacts(response.data)
            })
    })

    return (
        <div>
            <h2>Phonebook</h2>

            <FilterContact newSearchTerm={newSearchTerm} handleSearchTermChange={handleSearchTermChange}/>

            <h3>add a new</h3>

            <ContactForm persons={contacts} setPersons={setContacts}/>

            <h2>Numbers</h2>
            <div>
                {contactsToShow.map(person =>
                    <ContactInfo key={person.name} contact={person}/>
                )}
            </div>
        </div>
    )
}

export default App
