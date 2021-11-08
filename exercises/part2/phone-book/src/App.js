import React, {useState} from 'react'
import ContactInfo from "./components/ContactInfo";
import FilterContact from "./components/FilterContact";
import ContactForm from "./components/ContactForm";

const App = () => {
    const [contacts, setContacts] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [newSearchTerm, setNewSearchTerm] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    const contactsToShow = isSearching
        ? contacts.filter(p => p.name.toLowerCase().includes(newSearchTerm.toLowerCase()))
        : contacts

    const handleSearchTermChange = (event) => {
        setIsSearching(true)
        setNewSearchTerm(event.target.value)
    }

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
