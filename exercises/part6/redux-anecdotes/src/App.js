import React, {useEffect} from 'react'
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import anecdoteService from "./services/anecdotes";
import {initializeData} from "./reducers/anecdoteReducer";
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        anecdoteService
            .getAll().then(data => dispatch(initializeData(data)))
    }, [dispatch])

  return (
    <div>
      <Notification/>

      <h2>Anecdotes</h2>
        <Filter/>
        <AnecdoteList/>
        <AnecdoteForm/>
    </div>
  )
}

export default App
