import React, {useState} from 'react'

const Button = ({onclick, text}) => (
    <button onClick={onclick}>{text}</button>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    let average = 0, positive = 0

    const handleGoodClick = () => {
        setGood(good + 1)
        setAll(all + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
        setAll(all + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
        setAll(all + 1)
    }

    const calculateAndSetAvg = () => {
        if (all === 0) {
            average = 0
        } else {
            average = (good - bad) / all
        }
        return average
    }

    const calculateAndSetPositive = () => {
        if (all === 0) {
            positive = 0
        } else {
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
            <p>all {all}</p>
            <p>average {calculateAndSetAvg()}</p>
            <p>positive {calculateAndSetPositive()} %</p>

        </div>
    );
}

export default App;
