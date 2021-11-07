import React, {useState} from 'react'

const StatisticLine = ({text, value}) => {
    if (text === "positive") {
        return <p>{text} {value} %</p>
    }
    return <p>{text} {value}</p>
}

const Statistics = ({good, neutral, bad}) => {
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

    if (calculateAll() === 0) {
        return <p>no feedback given</p>
    }

    return (
        <table>
            <tbody>
            <tr>
                <td>good</td>
                <td>{good}</td>
            </tr>
            <tr>
                <td>neutral</td>
                <td>{neutral}</td>
            </tr>

            <tr>
                <td>bad</td>
                <td>{bad}</td>
            </tr>
            <tr>
                <td>all</td>
                <td>{calculateAll()}</td>
            </tr>
            <tr>
                <td>average</td>
                <td>{calculateAvg()}</td>
            </tr>
            <tr>
                <td>positive</td>
                <td>{calculatePositive()} %</td>
            </tr>
            </tbody>
        </table>
    )
}

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

    return (
        <div>
            <h1>give feedback</h1>
            <Button onclick={handleGoodClick} text="good"/>
            <Button onclick={handleNeutralClick} text="neutral"/>
            <Button onclick={handleBadClick} text="bad"/>

            <h2>statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad}/>

        </div>
    );
}

export default App;
