import React, {useState} from 'react'

const Button = ({onclick, text}) => (
    <button onClick={onclick}>{text}</button>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    const calculateAll = () => {
        return good + bad + neutral
    }

    const calculateAvg = () => {
        let all = calculateAll()
        let average = 0
        if (all !== 0) {
            average = (good - bad) / all
        }
        return average
    }

    const calculatePositive = () => {
        let all = calculateAll()
        let positive = 0
        if (all !== 0) {
            positive = (good / all) * 100
        }
        return positive
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button onclick={handleGoodClick} text="good"/>
            <Button onclick={handleNeutralClick} text="neutral"/>
            <Button onclick={handleBadClick} text="bad"/>

            <h2>statistics</h2>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {calculateAll()}</p>
            <p>average {calculateAvg()}</p>
            <p>positive {calculatePositive()} %</p>

        </div>
    );
}

export default App;
