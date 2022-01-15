import userService from '../services/users'
import { setNotification } from './notificationReducer'

export const initializeUsers = () => {
    return async (dispatch) => {
        try {
            const users = await userService.getAll()
            dispatch({ type: 'INIT_USERS', data: users })
        } catch (error) {
            console.log(error)
            const notification = {
                message: `Error getting users`,
                isError: true
            }
            dispatch(setNotification(notification, 5));
        }
    }
}

const userReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_USERS':
            return action.data
        default:
            return state
    }
}

export default userReducer
