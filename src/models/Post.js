const { DataTypes } = require('sequelize')

const sequelize = require('../database')
const User = require('./User')

const Post = sequelize.define('post', {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Post   