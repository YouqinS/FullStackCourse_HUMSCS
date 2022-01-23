const { gql } = require("apollo-server")

module.exports = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
 
   type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String!]
    id: ID!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  
    type Mutation {
      addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]
      ): Book
      
      editAuthor(
        name: String!
        setBornTo: Int!
      ): Author
  }
`