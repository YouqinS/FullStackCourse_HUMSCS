import loginService from '../services/login'
import blogService from '../services/blogs'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {setNotification} from "../reducers/notificationReducer";
import {useDispatch} from "react-redux";

const LoginForm = ({ setUser }) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedinAppUser', JSON.stringify(user)
      )
      console.log(window.localStorage)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log("login error", error)
      const notification = {
        message: 'wrong username or password',
        isError: true
      }
      dispatch(setNotification(notification, 5));
    }
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
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button  id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
