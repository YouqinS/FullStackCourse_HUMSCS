const notificationReducer = (state = "notification", action) => {
    console.log('ACTION: ', action)
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.notification
        case "CLEAR_NOTIFICATION":
            return ""
        default:
            return state
    }
}

export const setNotification = (content, timeout) => {
    return async dispatch => {
        dispatch({
            type: "SET_NOTIFICATION",
            notification: content
        })
        setTimeout(() => {
            dispatch({
                type: "CLEAR_NOTIFICATION",
            })
        }, timeout * 1000)
    }
}


export default notificationReducer
