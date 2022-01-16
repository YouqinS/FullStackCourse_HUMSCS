import React from 'react'
import {useDispatch} from "react-redux";
import {setUser} from "../reducers/currentUserReducer";
import {Button} from "react-bootstrap";

const Logout = ({user}) => {
    const dispatch = useDispatch()

    const handleLogout = async () => {
        console.log('logging out')
        window.localStorage.clear()
        dispatch(setUser(null))
    }

    return user ?
        (
            <div>
                <Button onClick={handleLogout}>logout</Button>
            </div>
        )
        :
        ''
}

export default Logout
