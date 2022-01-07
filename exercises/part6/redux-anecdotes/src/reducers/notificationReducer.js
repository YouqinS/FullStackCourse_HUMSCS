const notificationReducer = (state = {notification: "notification", timer: null}, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            if (state.timer !== null) {
                clearTimeout(state.timer)
            }
            return { notification: action.data.msg, timer: action.data.timer }
        case "CLEAR_NOTIFICATION":
            return  { notification: '', timer: null }
        default:
            return state
    }
}

export const setNotification = (msg, timeout) => {
    return async dispatch => {
        const timer = setTimeout(() => {
            dispatch({
                type: "CLEAR_NOTIFICATION",
            })
        }, timeout * 1000)
        dispatch({
            type: "SET_NOTIFICATION",
            data: {msg, timer}
        })
    }
}


export default notificationReducer
