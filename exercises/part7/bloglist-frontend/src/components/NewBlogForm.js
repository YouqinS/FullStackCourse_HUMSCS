import {useState} from 'react'
import React from 'react'
import {useDispatch} from "react-redux";
import {createBlog} from "../reducers/blogReducer";
import {Button, Form} from "react-bootstrap";

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
            <Form id="create-blog-form" onSubmit={addBlog}>
                <Form.Group>
                    <Form.Label> title: </Form.Label>
                    <Form.Control type="text" id='title' value={title} onChange={({target}) => setNewTitle(target.value)} />
                    <Form.Label> author: </Form.Label>
                    <Form.Control type="text" id='author' value={author} onChange={({target}) => setNewAuthor(target.value)} />
                    <Form.Label> url: </Form.Label>
                    <Form.Control type="text" id='url' value={url} onChange={({target}) => setNewUrl(target.value)} /><br/>
                <Button id='createBtn' type="submit" variant="primary" >create</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default NewBlogForm
