import React, {useState} from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)

    const initialVote = 0
    const votesInitial = {}
    anecdotes.forEach(x => votesInitial[x] = initialVote)
    const [votes, setVotes] = useState({...votesInitial})


    const selectAndSetNextAnecdote = () => {
        let indx = Math.floor(Math.random() * anecdotes.length)
        setSelected(indx)
    }

    const addVote = () => {
        const copy = { ...votes }
        copy[anecdotes[selected]] += 1
        setVotes(copy)
    }

    const getAnecdoteWithMostVotes = () => {
        const copy = { ...votes }
        let mostVoted = anecdotes[selected]
        for (const [key, value] of Object.entries(copy)) {
            if (value > copy[mostVoted]) {
                mostVoted = key
            }
        }
        return mostVoted
    }

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[anecdotes[selected]]} votes</p>
            <br/>
            <button onClick={addVote}>vote</button>
            <button onClick={selectAndSetNextAnecdote}>next anecdote</button>
            <h2>Anecdote with most votes</h2>
            <p>{getAnecdoteWithMostVotes()}</p>
        </div>
    )
}

export default App
