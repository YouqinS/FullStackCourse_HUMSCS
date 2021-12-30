import React, {useState} from 'react'

const Blog = ({blog, updateLikes, removeBlog}) => {
  const [visible, setVisible] = useState(false)
  const label = visible ? "hide" : "view"

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
    return (
        <div>
          {
            visible ?
                <div style={blogStyle}>
                  <p>{blog.title}
                  <button onClick={showHide}> {label} </button></p>
                  <p>{blog.url}</p>
                  <p>{blog.likes} <button onClick={updateLikes}>like</button></p>
                  <p>{blog.author}</p>
                  <button onClick={removeBlog}>remove</button>
                </div>
                :
                <div>
                  {blog.title} {blog.author}
                  <button onClick={showHide}> {label} </button>
                </div>
          }
        </div>
    )
}

export default Blog
