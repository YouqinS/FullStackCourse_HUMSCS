import blogService from "../services/blogs";
import {useState} from "react";

const NewBlogForm = ({ blogs, setBlogs, setNotification }) => {

    const [title, setNewTitle] = useState('title')
    const [author, setNewAuthor] = useState('author')
    const [url, setNewUrl] = useState('url')

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
                const notification = {
                    message: `added a new blog: ${title} by ${author}`,
                    isError: false
                }
                setNotification(notification)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            }).catch(error => {
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
                </form>
                <br/>
            </div>
        )
}

export default NewBlogForm
