import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {deleteBlog, incrementLike} from "../reducers/blogReducer";
import {Redirect, useHistory, useRouteMatch} from "react-router-dom";
import {Button} from "react-bootstrap";

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

    const updateLikes = () => {
        dispatch(incrementLike(blog))
    }

    const removeBlog = () => {
        dispatch(deleteBlog(blog))
        history.push('/')
    }

    if (!blog) {
        return <Redirect to="/"/>
    }

    return (
        <div style={blogStyle} className='blog' id='blog-details'>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>
            <div><strong> {blog.likes}</strong>
                <Button onClick={updateLikes}>like</Button>
            </div>
            <p>added by <em>{blog.author}</em></p>
            <Button onClick={removeBlog}>remove</Button>
        </div>
    )
}

export default Blog
