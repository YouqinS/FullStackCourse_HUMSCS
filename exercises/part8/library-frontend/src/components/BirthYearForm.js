import {useMutation} from "@apollo/client";
import React, {useEffect, useState} from "react";
import Select from "react-select";

import {EDIT_BORN, ALL_AUTHORS, ALL_BOOKS} from "../queries";

const BirthYearForm = ({setError, authorNames}) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [editBorn, result] = useMutation(EDIT_BORN, {
        refetchQueries: [{query: ALL_AUTHORS}],
    })

    useEffect(() => {
        if (result.data && !result.data.editAuthor) {
            setError('name not found')
        }
    }, [result.data])  // eslint-disable-line

    const submit = (event) => {
        event.preventDefault()

        editBorn({variables: {name: name, setBornTo: parseInt(born)}})
        console.log(name, parseInt(born))

        setName('')
        setBorn('')
    }

    const options = authorNames.map(name => {
        return {
            value: name,
            label: name
        }
    })

    return (
        <div>
            <h3>set birth year</h3>
            <form onSubmit={submit}>
                <Select
                    placeholder="Select author..."
                    options={options}
                    onChange={({label}) => setName(label)}
                />
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
