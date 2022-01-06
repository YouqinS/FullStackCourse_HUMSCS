import React from 'react';
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
    const good = 'GOOD'
    const ok = 'OK'
    const bad = 'BAD'
    const zero = 'ZERO'

    const update_feedback = (feedback) => {
        store.dispatch({
            type: feedback
        })
    }

    const total = () => {
        return store.getState().good + store.getState().ok + store.getState().bad
    }

    const avg = () => {
        const all = total()
        let average = 0
        if (all !== 0) {
            average = (store.getState().good - store.getState().bad) / all
        }
        return average
    }

    const posi = () => {
        const all = total()
        let positive = 0
        if (all !== 0) {
            positive = (store.getState().good / all) * 100
        }
        return positive
    }


    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={() => update_feedback(good)}>good</button>
            <button onClick={() => update_feedback(ok)}>ok</button>
            <button onClick={() => update_feedback(bad)}>bad</button>
            <button onClick={() => update_feedback(zero)}>reset stats</button>
            <h2>statistics</h2>
            <div>good: {store.getState().good}</div>
            <div>ok: {store.getState().ok}</div>
            <div>bad: {store.getState().bad}</div>
            <div>all: {total()}</div>
            <div>average: {avg()}</div>
            <div>positive: {posi()} %</div>
        </div>
    )
}

const renderApp = () => {
    ReactDOM.render(<App/>, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
