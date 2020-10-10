const { buildSchema } = require('graphql')

const User = require('../models/User')

const schema = buildSchema(`
    type Query {
        hello:String!
    }

    type Mutation {
        createUser(email: String! password: String!) : User!
    }

    type User {
        id: String
        email: String
        password: String
        createdAt: String
        updatedAt: String
    }
`)

const resolvers = {
    createUser: async({email, password}) => {
        const newUser = await User.create({email, password})

        return newUser
    }
}

module.exports = { schema, resolvers }