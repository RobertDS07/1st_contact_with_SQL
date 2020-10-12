const { DataTypes } = require('sequelize')

const sequelize = require('../database')
const Like = require('./Like')

const Post = sequelize.define('post', {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Post.hasMany(Like)
Like.belongsTo(Post)

module.exports = Post   