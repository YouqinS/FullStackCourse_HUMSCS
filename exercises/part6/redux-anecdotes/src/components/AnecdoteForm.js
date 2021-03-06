import {connect, useDispatch} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteReducer";
import React from "react";
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        props.createAnecdote(content)

        props.setNotification(`you created '${content}'`, 5);

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
const mapDispatchToProps = {
    createAnecdote,
    setNotification,
};

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default connectedAnecdoteForm;
