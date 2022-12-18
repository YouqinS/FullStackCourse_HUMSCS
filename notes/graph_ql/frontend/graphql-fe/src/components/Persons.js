import {gql, useLazyQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import { FIND_PERSON } from '../queries/queries'
import PhoneForm from "./PhoneForm";


const Persons = ({ persons, setError }) => {
    const [getPerson, result] = useLazyQuery(FIND_PERSON)
    const [person, setPerson] = useState(null)
    const [showPhoneForm, setShowPhoneForm] = useState(false)
    const [nameForPhoneEdit, setNameForPhoneEdit] = useState("")

    const showPerson = (name) => {
        console.log(name)
        getPerson({ variables: { nameToSearch: name } })
    }

    useEffect(() => {
        if (result.data) {
            setPerson(result.data.findPerson)
            console.log(result)
            console.log(result.data)
        }
    }, [result.data])

    const resetPerson = () => {
        setPerson(null); //not working??
        console.log("person", person)
    }

    const editPhone = (name) => {
      setShowPhoneForm(!showPhoneForm)
        setNameForPhoneEdit(name)
    }

    if (person) {
        return(
            <div>
                <h2>{person.name}</h2>
                <div>{person.address.street} {person.address.city}</div>
                <div>{person.phone}</div>
                <button onClick={resetPerson}>close</button>
            </div>
        )
    }

    if (showPhoneForm) {
        const cancelEditPhone = () => {
            setShowPhoneForm(false)
        }
        return <div>
            <PhoneForm name={nameForPhoneEdit} setError={setError} setShowPhoneForm={setShowPhoneForm}/>
            <button onClick={cancelEditPhone}>close</button>
        </div>
    }

    return (
        <div>
            <h2>Persons</h2>
            {persons.map(p =>
                <div key={p.name}>
                    {p.name} {p.phone}
                    <button onClick={() => showPerson(p.name)} >
                        show address
                    </button>
                    <button onClick={() => editPhone(p.name)} >
                        {showPhoneForm ? "cancel" : "edit number"}
                    </button>
                </div>
            )}
        </div>
    )
}

export default Persons
