import React from 'react'
import {useDispatch} from "react-redux";
import {setUser} from "../reducers/currentUserReducer";

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
                {user.username} logged in
                <button onClick={handleLogout}>logout</button>
            </div>
        )
        :
        ''
}

export default Logout
