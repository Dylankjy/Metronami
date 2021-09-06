'use strict'

const { Sequelize } = require('sequelize')
const db = {}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/metronami_userdata.sqlite',
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
