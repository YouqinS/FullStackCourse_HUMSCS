import React, {useState, useEffect} from 'react'
import loginService from '../services/login'
import noteService from '../services/notes'
import PropTypes from 'prop-types'

const LoginForm = ({setUser, setErrorMessage}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    LoginForm.propTypes = {
        setUser: PropTypes.func.isRequired,
        setErrorMessage: PropTypes.func.isRequired,
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            //to remove: window.localStorage.removeItem('loggedNoteappUser')
            //to clear localstorage: window.localStorage.clear()
            console.log(window.localStorage)
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            setErrorMessage('error login')
            console.log(error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                username
                <input
                    id='username'
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                />
                password
                <input
                    id='password'
                    type="password"
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                />
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
