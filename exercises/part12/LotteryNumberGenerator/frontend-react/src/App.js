import './App.css';
import {useEffect, useState} from "react";
import axios from './util/client'
import LotteryForm from "./Form";

function App() {
    const [entrypoint, setEntrypoint] = useState("")
    const [tickets, setTickets] = useState([])

    const refresh = async () => {
        const { data } = await axios.get('/')
        console.log("backend-go entrypoint: ", data)
        setEntrypoint(data)
    }
    useEffect(() => {
        refresh()
    }, [])
    const getNewNumbers = async (ticketInput) => {
        console.log("ticketInput: ", ticketInput)
        //req: lng?lottoType=EUROJACKPOT&howMany=2
        const urlParam = "?lottoType=" + ticketInput.lotteryType + "&howMany=" + ticketInput.howMany;
        const { data } = await axios.post('/lng'+ urlParam)
        setTickets([...tickets, data])
    }

    return (
    <div className="App">
      <h1>{entrypoint}</h1>
        <h2>Generate new numbers</h2>
        <LotteryForm getNewNumbers={getNewNumbers}/>
        <div>
            <h2>Your tickets:</h2>
            <div>{tickets}</div>
        </div>
    </div>
  );
}

export default App;
