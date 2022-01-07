import {useDispatch} from "react-redux";
import {createAnecdote, incrementVoteOf} from "../reducers/anecdoteReducer";
import React from "react";
import {clearNotification, setNotification} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        dispatch(createAnecdote(content))

        dispatch(setNotification(`you created '${content}'`));
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)

    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote"/>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}

export default AnecdoteForm
