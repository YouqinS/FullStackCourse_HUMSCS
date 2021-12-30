import blogService from "../services/blogs";
import {useState} from "react";

const NewBlogForm = ({ createNewBlog }) => {
    const [title, setNewTitle] = useState('title')
    const [author, setNewAuthor] = useState('author')
    const [url, setNewUrl] = useState('url')

    const addBlog = (event) => {
        event.preventDefault()
        createNewBlog({
            title: title,
            author: author,
            url: url
        })

        setNewTitle("")
        setNewAuthor("")
        setNewUrl("")
    }

    return (
            <div>
                <h2>create new</h2>
                <form onSubmit={addBlog}>
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
