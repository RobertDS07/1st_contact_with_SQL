const { buildSchema } = require('graphql')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const Post = require('../models/Post')
const Like = require('../models/Like')

const schema = buildSchema(`
    type Query {
        login(email: String! password: String!) : Token!
        users: [User!]!
        posts: [Post!]!
    }

    type Mutation {
        createUser(email: String! password: String!) : User!
        createPost(content: String! userId: Int!) : Post!
        createLike(postId: Int! userId:Int!) : Boolean!
    }

    type User {
        id: Int
        email: String
        password: String
        posts: [Post]
        createdAt: String
        updatedAt: String
    }

    type Like {
        id: Int
        likesId: Int
        postId: Int
    }

    type Post {
        id: Int
        content: String
        userId: Int
        user: User
        likes: [Like]
        createdAt: String
        updatedAt: String
    }

    type Token {
        token: String
    }
`)

const resolvers = {
    users: async () => {
        const users = await User.findAll({ include: Post })

        return users
    },
    posts: async () => {
        const posts = await Post.findAll({ include: [User, Like]})

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
        } catch (e) {
            return e
        }
    },
    createLike: async ({ postId, userId }) => {
        try {
            const [newLike, created] = await Like.findOrCreate({ where: { [Op.and]: [{ postId }, { likesId: userId }] }, defaults: { likesId: userId, postId } })

            !created && await newLike.destroy()

            return true
        } catch (e) {
            return e
        }
    }
}

module.exports = { schema, resolvers }