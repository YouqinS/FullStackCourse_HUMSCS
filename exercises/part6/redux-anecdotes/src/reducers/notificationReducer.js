const notificationReducer = (state = "notification", action) => {
    console.log('ACTION: ', action)
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.notification
        case "CLEAR_NOTIFICATION":
            return action.notification
        default:
            return state
    }
}

export const setNotification = (content) => {
    return {
        type: "SET_NOTIFICATION",
        notification: content
    }
}

export const clearNotification = () => {
    return {
        type: "CLEAR_NOTIFICATION",
        notification: ""
    }
}


export default notificationReducer
