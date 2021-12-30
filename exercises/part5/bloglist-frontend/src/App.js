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
    const updateLikes = (id) => {
        const blogToBeUpdated = blogs.find(b => b.id === id)
        console.log("blogToBeUpdated=", blogToBeUpdated)
        const changedBlog = {...blogToBeUpdated, likes: (blogToBeUpdated.likes) + 1 }
        blogService.update(id, changedBlog).then(
            updatedBlog => {
                setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))
            }
        ).catch(error => {
            console.log('failed to update likes ')
            console.log(error)
            setNotification(
                `failed to update likes of Note '${blogToBeUpdated.title}`
            )
            setTimeout(() => {
                setNotification(null)
            }, 5000)
            setBlogs(blogs.filter(b => b.id !== id))
        })
    }

    const sortedBlogs = () => {
       return blogs.sort((a,b) => (a.likes > b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0)).reverse()
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
            {sortedBlogs().map(blog => <Blog key={blog.id} blog={blog} updateLikes={() => updateLikes(blog.id)}/>)}
        </div>
    )
}

export default App
