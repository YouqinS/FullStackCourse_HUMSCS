import {useDispatch} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteReducer";
import React from "react";

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        dispatch(createAnecdote(content))
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
