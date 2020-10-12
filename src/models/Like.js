const { DataTypes } = require('sequelize')

const sequelize = require('../database')

const Like = sequelize.define('like', {
    likesId: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Like