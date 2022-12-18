import logo from './logo.svg';
import './App.css';
import {ApolloClient, ApolloProvider, gql, HttpLink, InMemoryCache, useApolloClient, useQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import Persons from "./components/Persons";
import { ALL_PERSONS } from './queries/queries'
import PersonForm from "./components/PersonForm";
import Notify from "./components/Notify";
import LoginForm from './components/LoginForm'


function App() {
/*
    const [persons, setPersons] = useState([])
    const query = gql`
    query {
      allPersons {
        name,
        phone,
        address {
          street,
          city
        }
        id
      }
    }
    `
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: 'http://localhost:4000',
        })
    })

    useEffect(() => {
        client.query({query})
            .then((response) => {
                console.log(response.data)
                setPersons(response.data.allPersons)
            })
    }, [])
*/

    const [errorMessage, setErrorMessage] = useState(null)
    const [token, setToken] = useState(null)
    const result = useQuery(ALL_PERSONS, {
        //pollInterval: 2000
    })
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
    }


    if (result.loading) {
        return <div>loading...</div>
    }
    console.log(result)

    if (!token) {
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
        /*<div className="App">
            {/!*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*!/}
            {persons.map(p =>
                <div className="Container" key={p.id}>
                    <p>{p.name}: </p>
                    <p>{p.phone} </p>
                    <p>{p.address.city}, {p.address.street}</p><br/>
                </div>
            )}

        </div>*/
        <div>
            <Notify errorMessage={errorMessage} />

            <Persons persons={result.data.allPersons} setError={notify}/>
            <PersonForm setError={notify} />
        </div>
    );
}

export default App;
