import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Note from "../../../../../notes/react-notes/src/components/Note";

test('by default title and author are rendered, but not url or likes', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: "author",
        likes: 100,
        url: "http://example.com/"
    }

    const component = render(
        <Blog blog={blog} />
    )

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )

    expect(div).not.toHaveTextContent(
        '100'
    )

    expect(div).not.toHaveTextContent(
        'http://example.com/'
    )
})

test('clicking "view" button renders the details view of a blog item', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: "author",
        likes: 100,
        url: "http://example.com/"
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} showHide={mockHandler} />
    )

    const button = component.getByText('view')
    expect(button).toBeDefined()

    fireEvent.click(button)

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
        'http://example.com/'
    )
    const likes = component.getByText('100')
    expect(likes).toBeDefined()

    const likeButton = component.getByText('like')
    expect(likeButton).toBeDefined()
})


test('clicking "like" button calls event handler as expected', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: "author",
        likes: 100,
        url: "http://example.com/"
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} updateLikes={mockHandler} />
    )

    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)

    const buttonLike = component.getByText('like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
