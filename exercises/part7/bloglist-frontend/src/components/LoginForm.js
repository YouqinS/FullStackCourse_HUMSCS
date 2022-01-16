import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {login} from "../reducers/currentUserReducer";
import {useHistory} from "react-router-dom";

const LoginForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        dispatch(login({username, password}))

        setUsername('')
        setPassword('')
        history.push('/')
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        id='username'
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        id='password'
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
