const notificationReducer = (state = {notification: null, timer: null}, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            if (state.timer !== null) {
                clearTimeout(state.timer)
            }
            return { notification: action.data.notification, timer: action.data.timer }
        case "CLEAR_NOTIFICATION":
            const notification = {
                message: '',
                isError: false
            }
            return  { notification: notification, timer: null }
        default:
            return state
    }
}

export const setNotification = (notification, timeout) => {
    console.log("setNotification: ", notification)
    return async dispatch => {
        const timer = setTimeout(() => {
            dispatch({
                type: "CLEAR_NOTIFICATION",
            })
        }, timeout * 1000)
        dispatch({
            type: "SET_NOTIFICATION",
            data: {notification, timer}
        })
    }
}


export default notificationReducer
