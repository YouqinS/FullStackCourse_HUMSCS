import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {incrementVoteOf} from "../reducers/anecdoteReducer";

const Anecdote = ({anecdote, handleClick}) => {
    return (<div>
        {anecdote.content} has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
    </div>)
}


const AnecdoteList = () => {
    const dispatch = useDispatch()
    //const anecdotes = useSelector(state => state)
    const anecdotes = useSelector(state =>
         state.sort((a, b) => b.votes - a.votes)
    )

    return (
        <div>
            {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => dispatch(incrementVoteOf(anecdote.id))}/>)}
        </div>
    )
}


export default AnecdoteList
