import blogService from '../services/blogs'
import {setNotification} from "./notificationReducer";

const reducer = (state = [], action) => {
    switch(action.type) {
        case 'NEW_BLOG':
            return state.concat(action.data)
        case 'INIT_BLOGS':
            return action.data
        case 'UPDATE_BLOG': {
            const id = action.data.id
            const updated = action.data
            return state.map(b => b.id !== id ? b : updated )
        }
        case 'DELETE_BLOG':
            return state.filter((b) => b.id !== action.data.id)
        default:
            return state
    }
}

export const initializeData = () => {
    return async dispatch => {
        const data = await blogService.getAll()
        console.log("initializeData=", data)
        dispatch({
            type: 'INIT_BLOGS',
            data,
        })
    }
}

export const createBlog = content => {
    return async dispatch => {
        try {
            const newObj = await blogService.create(content)
            dispatch({
                type: 'NEW_BLOG',
                data: newObj,
            })
            const notification = {
                message: `you added new blog '${content.title}'`,
                isError: false
            }
            dispatch(setNotification(notification, 5));
        } catch (error) {
            console.log('failed to create new blog')
            console.log(error)

            const notification = {
                message: `failed to create new blog`,
                isError: true
            }
            dispatch(setNotification(notification, 5));
        }
    }
}

export const incrementLike = (blogToBeUpdated) => {
    return async dispatch => {
        console.log('blogToBeUpdated=', blogToBeUpdated)
        try {
            const changedBlog = await blogService.update(blogToBeUpdated.id, {
                ...blogToBeUpdated,
                likes: blogToBeUpdated.likes + 1
            })
            dispatch({
                type: 'UPDATE_BLOG',
                data: changedBlog,
            })

        } catch (error) {
            console.log('failed to update likes ')
            console.log(error)

            const notification = {
                message: `failed to update likes of blog ${blogToBeUpdated.title}`,
                isError: true
            }
            dispatch(setNotification(notification, 5));
        }
    }
}

export const deleteBlog = (blogToBeRemoved) => {
    console.log('blogToBeRemoved=', blogToBeRemoved)
    if (window.confirm(`Sure to remove blog ${blogToBeRemoved.title} by ${blogToBeRemoved.author}?`)) {
        return async dispatch => {
            try {
                const response = await blogService.remove(blogToBeRemoved.id)
                console.log("deleteBlog response: ", response)
                if (response.status === 204) {
                    dispatch({
                        type: 'DELETE_BLOG',
                        data: blogToBeRemoved,
                    })
                }
            } catch (e) {
                const notification = {
                    message: `failed to remove blog ${blogToBeRemoved.title}`,
                    isError: true
                }
                dispatch(setNotification(notification, 5));
            }
        }
    }
}

export default reducer
