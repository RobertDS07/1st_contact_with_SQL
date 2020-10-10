const { buildSchema } = require('graphql')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const Post = require('../models/Post')

const schema = buildSchema(`
    type Query {
        login(email: String! password: String!) : Token!
        users: [User!]!
        posts: [Post!]!
    }

    type Mutation {
        createUser(email: String! password: String!) : User!
        createPost(content: String! userId: Int!) : Post!
    }

    type User {
        id: Int
        email: String
        password: String
        posts: [Post]
        createdAt: String
        updatedAt: String
    }

    type Post {
        id: Int
        content: String
        userId: Int
        user: User
        createdAt: String
        updatedAt: String
    }

    type Token {
        token: String
    }
`)

const resolvers = {
    users: async() => {
        const users = await User.findAll({include: Post})
        console.log(users);

        return users
    },
    posts: async() => {
        const posts = await Post.findAll({ include: User})
        
        return posts
    },
    login: async ({ email, password }) => {
        try {
            const user = await User.findOne({ where: { email } })

            if (!user || !await bcrypt.compare(password, user.password)) throw new Error('Credentials not found')

            return { token: '123456' }
        } catch (e) {
            return e
        }
    },
    createUser: async ({ email, password }) => {
        try {
            const [newUser, created] = await User.findOrCreate({ where: { email }, defaults: { password } })

            if (!created) throw new Error('already exist this email on us database')

            return newUser
        } catch (e) {
            return e
        }
    },
    createPost: async ({ userId, content }) => {
        try {
            const post = await Post.create({ userId, content })

            return post
        } catch(e) {
            return e
        }
    }
}

module.exports = { schema, resolvers }