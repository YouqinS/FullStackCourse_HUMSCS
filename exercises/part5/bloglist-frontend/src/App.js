import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setNewTitle] = useState('title')
  const [author, setNewAuthor] = useState('author')
  const [url, setNewUrl] = useState('url')
  const [user, setUser] = useState(null)

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
    blogService.getAll().then(blogs =>
        setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
          'loggedNoteappUser', JSON.stringify(user)
      )
      console.log(window.localStorage)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = async () => {
    console.log('logging out')
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
      <div>
        <h2>Log in to application</h2>
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
      </div>
  )

  const blogsDiv = () => (
      <div>
        <p>{user.username} logged in
          <button onClick={handleLogout}>logout</button>
        </p>

        <div>
          <h2>create new</h2>
          <form onSubmit={createNewBlog}>
            <label>
              title:
              <input value={title} onChange={({target}) => setNewTitle(target.value)}/>
            </label> <br/>
            <label>
              author:
              <input value={author} onChange={({target}) => setNewAuthor(target.value)}/>
            </label><br/>
            <label>
              url:
              <input value={url} onChange={({target}) => setNewUrl(target.value)}/>
            </label><br/>
            <button type="submit">create</button>
          </form><br/>
        </div>

        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
      </div>
  )

  const createNewBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    //add new blog to db
    blogService.create(blogObject)
        .then(newBlog => {
          setBlogs(blogs.concat(newBlog))
          setNewTitle("")
          setNewAuthor("")
          setNewUrl("")
        }).catch(error => {
      console.log(error)
    })
  }



  return (
    <div>
      <h2>blogs</h2>
      {user === null ?
          loginForm() :
          blogsDiv()
      }
    </div>
  )
}

export default App
