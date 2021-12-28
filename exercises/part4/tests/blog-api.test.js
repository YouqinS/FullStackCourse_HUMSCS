const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')


const initialBlogs = helper.initialBlogs

beforeEach(async () => {
    await Blog.deleteMany({})

    for (const blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
}, 100000)

describe('Blogs', () => {
    test('blogs are returned as json', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)


    test('returned content length is correct', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    }, 100000)

    test('blogs have a unique identifier named "id"', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'a title',
            author: 'Me',
            url: 'http://www.example.com',
            likes: 7,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfterAdd = await helper.blogsInDb()
        expect(blogsAfterAdd).toHaveLength(initialBlogs.length + 1)

        const contents = blogsAfterAdd.map(n => n.title)
        expect(contents).toContain('a title')
    })


    test('default value of likes is set to 0 if the property is missing from request', async () => {
        const newBlog = {
            title: 'a title',
            author: 'Me',
            url: 'http://www.example.com',
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfterAdd = await helper.blogsInDb()
        expect(blogsAfterAdd).toHaveLength(helper.initialBlogs.length + 1)

        expect(response.body.likes).toBe(0)
    })

    test('a blog cannot be added without title property', async () => {
        const newBlog = {
            author: 'Me',
            url: 'http://www.example.com',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAfterAdd = await helper.blogsInDb()
        expect(blogsAfterAdd).toHaveLength(initialBlogs.length)
    })


    test('a blog cannot be added without url property', async () => {
        const newBlog = {
            title: 'a title',
            author: 'Me',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAfterAdd = await helper.blogsInDb()
        expect(blogsAfterAdd).toHaveLength(initialBlogs.length)
    })
})

afterAll(() => mongoose.connection.close())
