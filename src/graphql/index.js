const { buildSchema } = require('graphql')

const schema = buildSchema(`
    type Query {
        hello:String!
    }
`)

const resolvers = {
    hello: 'hello world'
}

module.exports = { schema, resolvers }