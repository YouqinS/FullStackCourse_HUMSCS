import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {incrementVoteOf} from "../reducers/anecdoteReducer";
import {clearNotification, setNotification} from "../reducers/notificationReducer";

const Anecdote = ({anecdote, handleClick}) => {
    return (<div>
        {anecdote.content} has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
    </div>)
}


const AnecdoteList = () => {
    const dispatch = useDispatch()
    //const anecdotes = useSelector(state => state)
    const anecdotes = useSelector(state => {
            console.log(state.filter)
            if (state.filter === "") {
                return state.anecdotes.sort((a, b) => b.votes - a.votes)
            }
            return state.anecdotes.filter(n => n.content.toLowerCase().includes(state.filter.toLowerCase()))
        }
    )

    const handleOnclick = (anecdote) => {
        dispatch(incrementVoteOf(anecdote.id));
        dispatch(setNotification(`You voted '${anecdote.content}'`));
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote}
                                                 handleClick={() => handleOnclick(anecdote)}/>)}
        </div>
    )
}


export default AnecdoteList
