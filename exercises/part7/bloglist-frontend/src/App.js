import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import {useDispatch, useSelector} from "react-redux";
import {initializeData} from './reducers/blogReducer'
import {setUser} from "./reducers/currentUserReducer";
import Users from "./components/Users";
import {initializeUsers} from "./reducers/userReducer";
import {Link, Route, Switch} from "react-router-dom";
import Blogs from "./components/Blogs"
import {Nav, Navbar} from "react-bootstrap";
import User from "./components/User";

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

      {/*<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user ? <Link style={padding} to="/users">users</Link> : null}
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                  ? <em>user: <strong>{user}</strong></em>
                  : <Link style={padding} to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>*/}

{/*      <Logout user={user}/>*/}
{/*      {user === null ?
        <LoginForm />
        :
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <NewBlogForm />
        </Togglable>
      }*/}

      <Switch>
        <Route path="/blogs/:id">
          <Blog />
        </Route>

        <Route path="/users/:id">
          <User />
        </Route>

          <Route path="/users">
              <Users />
          </Route>

        <Route path="/login">
          <Logout user={user}/>
          {user === null ?
              <LoginForm />
              :
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <NewBlogForm />
              </Togglable>
          }
        </Route>

          <Route path="/">
              <Blogs />
          </Route>

      </Switch>

{/*
      {sortedBlogs().map(blog => <Blog key={blog.id} blog={blog} updateLikes={() => updateLikes(blog.id)}
        removeBlog={() => removeBlog(blog.id)}/>)}*/}


      {/*<Users />*/}
    </div>
  )
}

export default App
