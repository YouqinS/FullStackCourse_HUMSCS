const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Person = require('./models/person')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = "mimi"

const MONGODB_URI = 'mongodb+srv://fullstack:rzFjnv5XaTbpAQjp@cluster0.6s6l8.mongodb.net/graphql?retryWrites=true&w=majority'
console.log('connecting to', MONGODB_URI)


mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const typeDefs = gql`
  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
  type Address {
    street: String!
    city: String! 
  }
  
  enum YesNo {
    YES
    NO
  }
  
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }
  
  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    
    editNumber(
      name: String!
      phone: String!
    ): Person
    
    createUser(
      username: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
    
    addAsFriend(
      name: String!
    ): User
    
  }
  type Subscription {
  personAdded: Person!
}   
`

const resolvers = {
    Query: {
        personCount: () => Person.collection.countDocuments(),

        allPersons: async (root, args) => {
            if (!args.phone) {
                return Person.find({});
            }

            return Person.find({phone: {$exists: args.phone === 'YES'}})
        },

        findPerson: async (root, args) => await Person.findOne({name: args.name}),

        me: (root, args, context) => {
            return context.currentUser
        }
    },

    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    },

    Mutation: {
        addPerson: async (root, args, context) => {
            const person = new Person({ ...args })
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            try {
                await person.save()
                currentUser.friends = currentUser.friends.concat(person)
                await currentUser.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            await pubsub.publish('PERSON_ADDED', {personAdded: person})
            return person
        },

        editNumber: async (root, args) => {
            const person = await Person.findOne({ name: args.name })
            person.phone = args.phone

            try {
              return await person.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },

        createUser: (root, args) => {
            const user = new User({ username: args.username })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if ( !user || args.password !== 'mimi' ) {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, "mimi") }
        },

        addAsFriend: async (root, args, { currentUser }) => {
            const nonFriendAlready = (person) =>
                !currentUser.friends.map(f => f._id).includes(person._id)

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const person = await Person.findOne({ name: args.name })
            if ( nonFriendAlready(person) ) {
                currentUser.friends = currentUser.friends.concat(person)
            }

            await currentUser.save()

            return currentUser
        },
    },

    Subscription: {
        personAdded: {
            subscribe: () => pubsub.asyncIterator(['PERSON_ADDED'])
        },
    },
}



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User
                .findById(decodedToken.id).populate('friends')
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
