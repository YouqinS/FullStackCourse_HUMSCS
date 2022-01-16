import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {addComment, deleteBlog, incrementLike} from "../reducers/blogReducer";
import {Redirect, useHistory, useRouteMatch} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

const Blog = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const {
        params: {id: userIdMatch},
    } = useRouteMatch('/blogs/:id')

    const blog = useSelector((state) =>
        state.blogs.find((b) => b.id === userIdMatch))
    console.log("blog", blog)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [comment, setNewComment] = useState('comment')

    const updateLikes = () => {
        dispatch(incrementLike(blog))
    }

    const removeBlog = () => {
        dispatch(deleteBlog(blog))
        history.push('/')
    }

    const addCommentToBlog = (event) => {
        event.preventDefault()
        dispatch(addComment(blog, comment))
        setNewComment('')
    }

    if (!blog) {
        return <Redirect to="/"/>
    }

    return (
        <div style={blogStyle} className='blog' id='blog-details'>
            <h2>{blog.title} <Button onClick={removeBlog}
                                     style={{float: 'right', marginRight: 20, background: "red"}}>remove</Button></h2>
            <a href={blog.url}>{blog.url}</a>
            <div><strong> {blog.likes} likes </strong>
                <Button onClick={updateLikes}>like</Button>
            </div>
            <p>added by <em>{blog.author}</em></p>
            <h3>comments:</h3>

            <div>
                <Form onSubmit={addCommentToBlog}>
                    <Form.Group>
                        <Form.Control type="text" id='comment' value={comment} onChange={({target}) => setNewComment(target.value)} />
                        <Button id='createBtn' type="submit" variant="primary" >add comment</Button>
                    </Form.Group>
                </Form>
            </div>

            {blog.comments ?
                <div>
                    <ul>
                        {
                            blog.comments.map(comment =>
                                <li key={comment}>
                                    {comment}
                                </li>)
                        }
                    </ul>
                </div>
                : <p>{""}</p>
            }

        </div>
    )
}

export default Blog
