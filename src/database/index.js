const Sequelize = require('sequelize')

const dbConfig = require('../config/database')

const sequelize = new Sequelize(dbConfig)

const syncModels = (async () => await sequelize.sync())()

module.exports = sequelize