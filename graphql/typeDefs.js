const {gql} = require("apollo-server");

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    
    type Query {
        getPosts: [Post]
    }
    
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    
    type Mutation {
        register(registerInput: RegisterInput): User!
    }
`