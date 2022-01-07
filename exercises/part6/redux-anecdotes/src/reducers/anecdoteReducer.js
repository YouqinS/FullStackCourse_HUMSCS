import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_DATA':
      return action.data
    case 'INCREMENT_VOTE': {
      const id = action.data.id
      const updated = action.data
      return state.map(d =>
          d.id !== id ? d : updated
      )
    }
    default:
      return state
  }
}

export const initializeData = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_DATA',
      data,
    })
  }
}

export const incrementVoteOf = (id) => {
  return async dispatch => {
    const updated = await anecdoteService.incrementVoteOf(id)
    dispatch({
      type: 'INCREMENT_VOTE',
      data: updated,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newObj = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newObj,
    })
  }
}

export default reducer
