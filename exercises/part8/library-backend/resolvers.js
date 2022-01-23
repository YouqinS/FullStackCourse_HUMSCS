const {v1: uuid} = require('uuid')
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")
const {AuthenticationError} = require("apollo-server");
const {UserInputError} = require("apollo-server-core");
const jwt = require('jsonwebtoken')
const config = require("./utils/config");

const JWT_SECRET = config.JWT_SECRET

    module.exports = {
    Query: {
        authorCount: () => Author.collection.countDocuments(),
        bookCount: () => Book.collection.countDocuments(),

        allBooks: async (root, args) => {
            if (args.author && args.genre) {
                const author = await Author.findOne({name: args.author});
                return Book.find({
                    $and: [
                        {author: {$in: author.id}},
                        {genres: {$in: args.genre}},
                    ],
                }).populate("author");

            } else if (args.author) {
                const author = await Author.findOne({name: args.author});

                return Book.find({author: {$in: author.id}}).populate("author");

            } else if (args.genre) {
                return Book.find({genres: {$in: args.genre}}).populate("author");

            } else {
                return Book.find({}).populate("author");
            }
        },

        allAuthors: async () => {
            const authors = await Author.find({});

            return authors.map(async author => {
                const booksByAuthor = await Book.find({
                    author: {$in: author._id},
                }).populate("author");

                return ({
                    bookCount: booksByAuthor.length,
                    name: author.name,
                    born: author.born,
                    id: author.id
                })
            })
        },
    },
    Book: {
        author: async (root) => {
            const id = root.author;

            const bookCount = await Book.find({author: {$in: id}})
                .populate("author")
                .countDocuments();

            const author = await Author.findById(id);

            if (!author) return;

            return {
                name: author.name,
                born: author.born,
                bookCount,
                id: author.id
            };
        },
    },

    Mutation: {
        createUser: async (root, args) => {
            const user = new User({ ...args });
            try {
                await user.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
            return user;
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== "mimi") {
                throw new UserInputError("wrong username or password");
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, JWT_SECRET) };
        },

        addBook: async (root, args, context) => {
            let bookToAdd;
            try {
                let authorFound = await Author.findOne({ name: args.author });

                const currentUser = context.currentUser;

                if (!currentUser) {
                    throw new AuthenticationError("you need to login to add books");
                }

                if (authorFound) {
                    bookToAdd = new Book({ ...args, author: authorFound._id });
                    await bookToAdd.save();
                }

                if (!authorFound) {
                    authorFound = new Author({
                        name: args.author,
                        born: null,
                        bookCount: 1,
                        id: uuid(),
                    });

                    bookToAdd = new Book({ ...args, author: authorFound.id });
                    await authorFound.save();
                    await bookToAdd.save();
                }
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
            return bookToAdd;
        },

        editAuthor: async (root, args, context) => {
            const authorFound = await Author.findOne({ name: args.name });
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new AuthenticationError("you need to login to edit author data");
            }

            if (!authorFound) {
                throw new UserInputError("no author found with provided name");
            }

            authorFound.born = args.setBornTo;

            try {
                await authorFound.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
            return authorFound;
        },
    },
}
