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
      author: Author!
      genres: [String!]!
      id: ID!
   }
   
   type User {
        username: String!
        favoriteGenre: String!
        id: ID!
   }
      
  type Token {
    value: String!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  
    type Mutation {
        createUser(
            username: String!, 
            favoriteGenre: String!
    ): User
    
    login(
        username: String!, 
        password: String!
    ): Token
    
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
