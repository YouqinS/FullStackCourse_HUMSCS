const blogsRouter = require('express').Router()
const Blog = require('../models/blog')




blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    try {
        const { title, author, url, likes } = request.body
        const blog = new Blog({
            title,
            author,
            url,
            likes: likes || 0,
        })
        const newBlog = await blog.save()
        response.status(201).json(newBlog)
    } catch (e) {
        response.status(400).end()
    }
})


module.exports = blogsRouter
