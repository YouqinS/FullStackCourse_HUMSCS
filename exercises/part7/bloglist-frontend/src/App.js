import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import {useDispatch, useSelector} from "react-redux";
import {initializeData} from './reducers/blogReducer'
import {setUser} from "./reducers/currentUserReducer";
import Users from "./components/Users";
import {initializeUsers} from "./reducers/userReducer";
import {Link, Route, Switch} from "react-router-dom";
import Blogs from "./components/Blogs"
import User from "./components/User";
import Navigation from "./components/Navigation";

const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const user = useSelector((state) => state.currentUser)

  useEffect(() => {
    console.log(window.localStorage)
    const loggedUserJSON = window.localStorage.getItem('loggedinAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeData())
    dispatch(initializeUsers())
  },[dispatch])


  return (
    <div className="container">
      <Notification />
      <Navigation user={user}/>

      <h2>blog app</h2> <br/>
      {user ?
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <NewBlogForm/>
          </Togglable> : null
      }<br/>

      <Switch>
        <Route path="/blogs/:id">
          <Blog/>
        </Route>

        <Route path="/users/:id">
          <User/>
        </Route>

        <Route path="/users">
          <Users/>
        </Route>

        <Route path="/login">
          <LoginForm/>
        </Route>

        <Route path="/">
          <Blogs/>
        </Route>

      </Switch>
    </div>
  )
}

export default App
