import blogService from '../services/blogs'

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
        const newObj = await blogService.create(content)
        dispatch({
            type: 'NEW_BLOG',
            data: newObj,
        })
    }
}

export default reducer
