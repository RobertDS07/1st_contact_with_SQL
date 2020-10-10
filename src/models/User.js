const { DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

const sequelize = require('../database')
const Post = require('./Post')

const User = sequelize.define('user', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async(user) => {
            user.password = await bcrypt.hash(user.password, 10)
        }
    }
})

User.hasMany(Post)
Post.belongsTo(User)

module.exports = User