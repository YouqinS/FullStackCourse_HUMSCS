import {useState} from 'react'
import React from 'react'
import {useDispatch} from "react-redux";
import {createBlog} from "../reducers/blogReducer";
import {setNotification} from "../reducers/notificationReducer";

const NewBlogForm = () => {
    const dispatch = useDispatch()

    const [title, setNewTitle] = useState('title')
    const [author, setNewAuthor] = useState('author')
    const [url, setNewUrl] = useState('url')

    const addBlog = (event) => {
        event.preventDefault()
        const newBlog =
            {
                title: title,
                author: author,
                url: url
            }

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        dispatch(createBlog(newBlog))
    }

    return (
        <div className="formDiv">
            <h2>create new</h2>
            <form id="create-blog-form" onSubmit={addBlog}>
                <label>
                    title:
                    <input id='title' value={title} onChange={({target}) => setNewTitle(target.value)}/>
                </label> <br/>
                <label>
                    author:
                    <input id='author' value={author} onChange={({target}) => setNewAuthor(target.value)}/>
                </label><br/>
                <label>
                    url:
                    <input id='url' value={url} onChange={({target}) => setNewUrl(target.value)}/>
                </label><br/>
                <button id='createBtn' type="submit">create</button>
            </form>
            <br/>
        </div>
    )
}

export default NewBlogForm
