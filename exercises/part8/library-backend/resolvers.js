const { v1: uuid } = require('uuid')

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

module.exports = {
    Query: {
        authorCount: () => authors.length,
        bookCount: () => books.length,
        allBooks: (root, args) => {
            if (args.author && args.genre) {
                return books.filter(b => b.author === args.author && b.genres.includes(args.genre))
            } else if (args.author) {
                return books.filter(b => b.author === args.author)
            } else if (args.genre) {
                return books.filter(b => b.genres.includes(args.genre))
            } else {
                return books
            }
        },
        allAuthors: () => {
            return authors.map(author => ({
                bookCount: books.filter(b => b.author === author.name).length,
                name: author.name,
                born: author.born,
                id: author.id
            }))
        }
    },

    Mutation: {
        addBook: (root, args) => {
            //book already exists
            if (books.find(b => b.author === args.author && b.title === args.title)) {
                return null
            }
            const book = { ...args, id: uuid() }
            books = books.concat(book)
            //new author
            if (!authors.find(author => author.name === args.author)) {
                const author = ({
                    name: args.author,
                    id: uuid()
                })
                authors = authors.concat(author)
            }
            return book
        },

        editAuthor: (root, args) => {
            const author = authors.find(p => p.name === args.name)
            if (!author) {
                return null
            }

            const updatedPerson = { ...author, born: args.setBornTo}
            authors = authors.map(p => p.name === args.name ? updatedPerson : p)
            return updatedPerson
        }

    }
}
