import Note from './components/Note'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import {createStore} from "redux";
import noteReducer, {initializeNotes} from './reducers/noteReducer'
import {createNote} from "./reducers/noteReducer";
import {toggleImportanceOf} from "./reducers/noteReducer";
import { useSelector, useDispatch } from 'react-redux'
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import Home from "./components/Home";
import {BrowserRouter} from "react-router-dom";


const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [notes1, setNotes1] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState('error msg placeholder...')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

/*  sum of array of object values
const App1 = () => {
    const [x, setX] = useState(0)
    console.log(x)
    const t = [{v: 1}, {v: 2}, {v: 3}]
    //const s = t.map(o => o.v).reduce((s, o) => s + o, 0)
    const s = t.reduce((s, o) => s + o.v, 0)
    console.log("s=", s)
    return (
        <div>
          {x}
          <button onClick={()=>setX(10)}>press</button>
        </div>
    )
  }*/

  const notesToShow = showAll
    ? notes1
    : notes1.filter(note => note.important === true)

  //useEffect 1
  /*useEffect(() => {
        console.log('useEffect')
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                console.log('promise fulfilled')
                setNotes(response.data)
            })
    }, [])*/

  //useEffect 2
  /*    useEffect(() => {
            console.log('effect')

            const eventHandler = response => {
                console.log('promise fulfilled')
                setNotes(response.data)
            }

            const promise = axios.get('http://localhost:3001/notes')
            promise.then(eventHandler)
        }, [])*/

  //useEffect 3
  useEffect(() => {
    noteService.getAll().then(
      allNotes => {
        setNotes1(allNotes)
      }).catch(error => {
      console.log('fail')
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])


  //useState ********************************************************
  const addNote1 = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes1(notes1.concat(returnedNote))
      })
  }

  const toggleImportanceOf1 = (id) => {
    //console.log('importance of ' + id + ' needs to be toggled')
    console.log(`importance of ${id} needs to be toggled`)
    //const url = `http://localhost:3001/notes/${id}`
    const noteToBeChanged = notes1.find(n => n.id === id)
    console.log(noteToBeChanged)
    //{ ...noteToBeChanged } creates a new object with copies of all the properties from the noteToBeChanged object
    //we must never mutate state directly in React
    const changedNote = { ...noteToBeChanged, important: !noteToBeChanged.important }

    noteService.update(id, changedNote).then(
      updatedNote => {
        setNotes1(notes1.map(note => note.id === id ? updatedNote : note))
      }
    ).catch(error => {
      console.log('toggleImportanceOfNote failed: ' + error)
      setErrorMessage(
        `Note '${noteToBeChanged.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      // filter method returns a new array
      setNotes1(notes1.filter(n => n.id !== id))
    })
  }

  //extracted to own component
  /*    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )*/

  //refactored into Togglable
  /*
    const loginForm = () => {
        const hideWhenVisible = { display: loginVisible ? 'none' : '' }
        const showWhenVisible = { display: loginVisible ? '' : 'none' }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setLoginVisible(true)}>log in</button>
                </div>
                <div style={showWhenVisible}>
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                    <button onClick={() => setLoginVisible(false)}>cancel</button>
                </div>
            </div>
        )
    }
*/

  /*    const noteForm = () => (
        <div>
            <p>{user.username} logged in
                <button onClick={handleLogout}>logout</button>
            </p>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">submit</button>
            </form>
        </div>
    )*/

  const handleLogout = async () => {
    console.log('logging out')
    window.localStorage.clear()
    setUser(null)
  }
  //useState ************************************************************************************************




  //redux ********************************************************************************************************
  /*store.dispatch({
    type: 'NEW_NOTE',
    data: {
      content: 'the app state is in redux store',
      important: true,
      id: 1
    }
  })

  store.dispatch({
    type: 'NEW_NOTE',
    data: {
      content: 'state changes are made with actions',
      important: false,
      id: 2
    }
  })

  store.dispatch({
    type: 'TOGGLE_IMPORTANCE',
    data: {
      id: 2
    }
  })
  */

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  },[dispatch])

//redux ********************************************************************************************************



  return (
    <div className="App">
      <BrowserRouter>
      <Home/>
      </BrowserRouter>

      {/*<h1>Notes</h1>
      <Notification message={errorMessage}/>

      {user === null ?
        <Togglable buttonLabel="login">
          <LoginForm
            setUser={setUser}
            setErrorMessage={setErrorMessage}
          />
        </Togglable>
        :
        <div>
          {user.username} logged in <button onClick={handleLogout}>logout</button>

          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={addNote1}/>
          </Togglable>
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <div>
        <ul>
          {notesToShow.map(note =>
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf1(note.id)}/>
          )}
        </ul>

      </div>

      <div>
        <NewNote/>
        <VisibilityFilter/>
        <Notes/>
      </div>*/}

      <Footer/>

    </div>
  )
}

export default App
