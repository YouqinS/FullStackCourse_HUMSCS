import React, { useState } from 'react'
import {useDispatch} from "react-redux";
import {deleteBlog, incrementLike} from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

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
