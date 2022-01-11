import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import {useDispatch, useSelector} from "react-redux";
import {initializeData} from './reducers/blogReducer'
const App = () => {
  const dispatch = useDispatch()

  //const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(window.localStorage)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeData())
  },[dispatch])

  const blogs = useSelector(state => {
    return state.blogs
  })


  /*const updateLikes = (id) => {
    const blogToBeUpdated = blogs.find(b => b.id === id)
    console.log('blogToBeUpdated=', blogToBeUpdated)
    const changedBlog = { ...blogToBeUpdated, likes: (blogToBeUpdated.likes) + 1 }
    blogService.update(id, changedBlog).then(
      updatedBlog => {
        setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))
      }
    ).catch(error => {
      console.log('failed to update likes ')
      console.log(error)
      setNotification(
        `failed to update likes of blog '${blogToBeUpdated.title}`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setBlogs(blogs.filter(b => b.id !== id))
    })
  }*/
  /*const removeBlog = (id) => {
    const blogToBeRemoved = blogs.find(b => b.id === id)
    console.log('blogToBeRemoved=', blogToBeRemoved)
    if (window.confirm(`Sure to remove blog ${blogToBeRemoved.title} by ${blogToBeRemoved.author}?`)) {
      blogService.remove(id).then(
        () => {
          setBlogs(blogs.filter(b => b.id !== id))
        }
      ).catch(error => {
        console.log(error)
        setNotification(
          `failed to remove blog '${blogToBeRemoved.title}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }*/

  const sortedBlogs = () => {
    return blogs.sort((a, b) => (a.likes > b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0)).reverse()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Logout user={user} setUser={setUser}/>
      <Notification />
      {user === null ?
        <LoginForm setUser={setUser}/>
        :
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <NewBlogForm />
        </Togglable>
      }
      {sortedBlogs().map(blog => <Blog key={blog.id} blog={blog} updateLikes={() => updateLikes(blog.id)}
        removeBlog={() => removeBlog(blog.id)}/>)}
    </div>
  )
}

export default App
