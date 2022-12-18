import {gql, useMutation} from "@apollo/client";
import {useEffect, useState} from "react";

import { ALL_PERSONS, EDIT_NUMBER } from '../queries/queries'

const PhoneForm = ({setError, name, setShowPhoneForm}) => {
    //const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [editNumber, result] = useMutation(EDIT_NUMBER, {
        refetchQueries: [ { query: ALL_PERSONS } ],
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data && !result.data.editNumber) {
            setError('name not found') //if asking use to input name
        }
    }, [result.data])  // eslint-disable-line

    const submit = (event) => {
        event.preventDefault()

        editNumber({variables: {name: name, phone}})

        setPhone('')
        setShowPhoneForm(false)
    }

    return (
        <div>
            <p>edit number of <strong>{name}</strong></p>
            <form onSubmit={submit}>
{/*                <div>
                    name <input value={name}
                                onChange={({target}) => setName(target.value)}
                />
                </div>*/}
                <div>
                    phone <input value={phone}
                                 onChange={({target}) => setPhone(target.value)}
                />
                </div>

                <button type='submit'>submit</button>
                <button onClick={() => setShowPhoneForm(false)}>cancel</button>
            </form>
        </div>
    )
}

export default PhoneForm
