import {useDispatch} from "react-redux";
import {createAnecdote, incrementVoteOf} from "../reducers/anecdoteReducer";
import React from "react";
import {clearNotification, setNotification} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        const newAnecdote = await anecdoteService.create(content)
        dispatch(createAnecdote(newAnecdote))

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
