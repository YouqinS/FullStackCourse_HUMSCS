import {gql, useMutation} from "@apollo/client";
import React, {useEffect, useState} from "react";

import { EDIT_BORN, ALL_AUTHORS } from "../queries";

const BirthYearForm = ({setError}) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [editBorn, result] = useMutation(EDIT_BORN, {
        refetchQueries: [ { query: ALL_AUTHORS } ],
    })

    useEffect(() => {
        if (result.data && !result.data.editAuthor) {
            setError('name not found') //if asking use to input name
        }
    }, [result.data])  // eslint-disable-line

    const submit = (event) => {
        event.preventDefault()

        editBorn({variables: {name, setBornTo: parseInt(born)}})

        setName('')
        setBorn('')
    }

    return (
        <div>
            <h3>set birth year</h3>
            <form onSubmit={submit}>
                <div>
                    name <input value={name}
                                onChange={({target}) => setName(target.value)}
                />
                </div>
                <div>
                    born <input type='number'
                    value={born}
                                 onChange={({target}) => setBorn(target.value)}
                />
                </div>

                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default BirthYearForm
