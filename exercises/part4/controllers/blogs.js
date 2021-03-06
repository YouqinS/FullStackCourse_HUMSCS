const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require("../utils/middleware");


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    if (!request.token || !request.decodedToken) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user

    const body = request.body
    try {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    } catch (e) {
        response.status(400).end()
    }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

    if (!request.token || !request.decodedToken) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user

    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).end()
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {
    if (!request.token || !request.decodedToken) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const body = request.body
    const blog = {
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        blog,
        { new: true }
    )
    response.json(updatedBlog)
})

module.exports = blogsRouter
