import React, {useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from "./components/Notify";
import {useApolloClient} from "@apollo/client";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

const App = () => {
    const [page, setPage] = useState('authors')
    const [errorMessage, setErrorMessage] = useState(null)
    const [token, setToken] = useState(null)
    const [showLogin, setShowLogin] = useState(!token)

    const client = useApolloClient()

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
        setShowLogin(false)
    }

    if (showLogin && !token) {
        return (
            <div>
                <Notify errorMessage={errorMessage} />
                <h2>Login</h2>
                <LoginForm
                    setToken={setToken}
                    setError={notify}
                />
            </div>
        )
    }

    return (
        <div>
            {
                token ?
                    <div>
                        <button onClick={() => setPage('authors')}>authors</button>
                        <button onClick={() => setPage('books')}>books</button>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={() => setPage('recommend')}>recommend</button>
                        <button onClick={logout}>logout</button>
                    </div>
                    :
                    <div>
                        <button onClick={() => setPage('authors')}>authors</button>
                        <button onClick={() => setPage('books')}>books</button>
                        <button onClick={() => setShowLogin(true)}>login</button>
                    </div>
            }


            <Notify errorMessage={errorMessage}/>

            <Authors
                show={page === 'authors'}
                setError={notify}
            />

            <Books
                show={page === 'books'}
            />

            <NewBook
                show={page === 'add'}
                setError={notify}
            />
            <Recommend
                show={page === 'recommend'}
                setError={notify}
            />

        </div>
    )
}

export default App
