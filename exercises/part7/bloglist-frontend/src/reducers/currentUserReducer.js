import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const currentUserReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        default:
            return state
    }
}

export const checkCurrentUser = () => {
    return (dispatch) => {
        console.log(window.localStorage)

        const loggedUserJSON = window.localStorage.getItem('loggedinAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
        }
    }
}

export const login = ({username, password}) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({username, password})
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedinAppUser', JSON.stringify(user))
            dispatch({
                type: 'LOGIN',
                data: user,
            })
        } catch (error) {
            const notification = {
                message: 'Wrong username or password',
                isError: true
            }
            dispatch(setNotification(notification, 5));
        }
    }
}

export const setUser = (user) => {
    return {
        type: 'LOGIN',
        data: user,
    }
}

export default currentUserReducer
