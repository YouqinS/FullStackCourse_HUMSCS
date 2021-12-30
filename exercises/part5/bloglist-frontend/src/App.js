import React, {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";

const App = () => {
    const [blogs, setBlogs] = useState([])
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
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const createNewBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()

        //add new blog to db
        blogService.create(blogObject)
            .then(newBlog => {
                setBlogs(blogs.concat(newBlog))

                const notification = {
                    message: `added a new blog: ${blogObject.title} by ${blogObject.author}`,
                    isError: false
                }
                setNotification(notification)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            }).catch(error => {
            console.log("failed to add new blog")
            console.log(error)
            const notification = {
                message: `failed to add new blog`,
                isError: true
            }
            setNotification(notification)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        })
    }

    return (
        <div>
            <h2>blogs</h2>
            <Logout user={user} setUser={setUser}/>
            <Notification notification={notification}/>
            {user === null ?
                <Togglable buttonLabel="log in" ref={blogFormRef}>
                    <LoginForm setUser={setUser} setNotification={setNotification}/>
                </Togglable>
                :
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                    <NewBlogForm createNewBlog={createNewBlog}/>
                </Togglable>
            }
            {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
        </div>
    )
}

export default App
