import { useState } from 'react'
import React from 'react'

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

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label>
                        title:
          <input id='title' value={title} onChange={({ target }) => setNewTitle(target.value)}/>
        </label> <br/>
        <label>
                        author:
          <input id='author' value={author} onChange={({ target }) => setNewAuthor(target.value)}/>
        </label><br/>
        <label>
                        url:
          <input id='url' value={url} onChange={({ target }) => setNewUrl(target.value)}/>
        </label><br/>
        <button type="submit">create</button>
      </form>
      <br/>
    </div>
  )
}

export default NewBlogForm
