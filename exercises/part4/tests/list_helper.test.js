const listHelper = require('../utils/list_helper')
const listWithOneBlog = listHelper.listWithOneBlog
const blogs1 = listHelper.blogs1
const blogs2 = listHelper.blogs2


describe('totalLikes', () => {
    test('an empty list returns 0', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('a list of blogs all with 0 likes returns 0', () => {
        const result = listHelper.totalLikes(blogs1)
        expect(result).toBe(0)
    })

    test('a list of blogs with varying number of likes returns the sum of likes', () => {
        const result = listHelper.totalLikes(blogs2)
        expect(result).toBe(36)
    })


    test('a list with only one blog returns the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})


describe('favoriteBlog', () => {
    test('an empty list returns null', () => {
        const result = listHelper.favoriteBlog([])
            expect(result).toEqual(null)
    })

    test('a list of items with equal number of likes returns the last of them', () => {
        const result = listHelper.favoriteBlog(blogs1)
        const expected = {
            title: 'TEST2',
            author: 'who',
            likes: 0,
        }

        expect(result).toEqual(expected)
    })


    test('a list with one item returns that item', () => {
        const expected = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(expected)
    })


    test('a list of blogs with varying number of likes returns the one with most likes', () => {
        const expected = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        }

        const result = listHelper.favoriteBlog(blogs2)
        expect(result).toEqual(expected)
    })
})


describe('mostBlogs', () => {
    test('an empty list returns null', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual(null)
    })

    test('a list with one item returns that data based on that item', () => {
        const expected = {
            author: 'Edsger W. Dijkstra',
            blogs: 1,
        }
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual(expected)
    })

    test('a list of many items returns calculated result', () => {
        const expected = {
            author: 'Robert C. Martin',
            blogs: 3,
        }

        const result = listHelper.mostBlogs(blogs2)
        expect(result).toEqual(expected)
    })
})

describe('mostLikes', () => {
    test('an empty list returns null', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual(null)
    })

    test('a list with one item returns that data based on that item', () => {
        const expected = {
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual(expected)
    })

    test('a list of many items returns calculated result', () => {
        const expected = {
            author: 'Edsger W. Dijkstra',
            likes: 17,
        }

        const result = listHelper.mostLikes(blogs2)
        expect(result).toEqual(expected)
    })
})
