import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'

test('<NewBlogForm /> updates parent state and calls onSubmit', () => {
  const createNewBlog = jest.fn()

  const component = render(
    <NewBlogForm createNewBlog={createNewBlog} />
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: 'a blog title' }
  })
  fireEvent.change(author, {
    target: { value: 'a blog author' }
  })
  fireEvent.change(url, {
    target: { value: 'a blog url' }
  })
  fireEvent.submit(form)

  expect(createNewBlog.mock.calls).toHaveLength(1)
  expect(createNewBlog.mock.calls[0][0].title).toBe('a blog title')
  expect(createNewBlog.mock.calls[0][0].author).toBe('a blog author')
  expect(createNewBlog.mock.calls[0][0].url).toBe('a blog url')
})
