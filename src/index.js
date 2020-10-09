const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const { schema, resolvers } = require('./graphql')

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(8081, () => console.log('http://localhost:8081/graphql'))