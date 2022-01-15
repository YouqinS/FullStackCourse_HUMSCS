import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {deleteBlog, incrementLike} from "../reducers/blogReducer";
import {useRouteMatch} from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch()

  const {
    params: { id: userIdMatch },
  } = useRouteMatch('/blogs/:id')

  const blog = useSelector((state) =>
      state.blogs.find((b) => b.id === userIdMatch))
  console.log("blog", blog)

  const [visible, setVisible] = useState(false)
  const label = visible ? 'hide' : 'view'

  const showHide = () => {
    setVisible(!visible)
  }
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
  }

  return (
    <div>
      {
        visible ?
          <div style={blogStyle} className='blog' id='blog-details'>
            <p>{blog.title}
              <button onClick={showHide}> {label} </button></p>
            <p>{blog.url}</p>
            <p>{blog.likes} <button onClick={updateLikes}>like</button></p>
            <p>{blog.author}</p>
            <button onClick={removeBlog}>remove</button>
          </div>
          :
          <div className='blog' id='blog'>
            {blog.title} {blog.author}
            <button onClick={showHide}> {label} </button>
          </div>
      }
    </div>
  )
}

export default Blog
