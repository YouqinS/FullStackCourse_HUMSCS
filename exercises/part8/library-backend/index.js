const {
    ApolloServer, gql, UserInputError,
    AuthenticationError
} = require('apollo-server')
const mongoose = require('mongoose')

const jwt = require("jsonwebtoken");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

require("dotenv").config();
const config = require("./utils/config");
const User = require("./models/user");

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI).then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
            const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        }
    },
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})
