import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)


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


    const mainBlock = () => (
        <div>
            <Logout user={user} setUser={setUser}/>
            <NewBlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification}/>
            {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
        </div>
    )

    return (
        <div>
            <h2>blogs</h2>
            <Notification notification={notification}/>
            {user === null ?
                <LoginForm setUser={setUser} setNotification={setNotification}/>
                :
                mainBlock()
            }
        </div>
    )
}

export default App
