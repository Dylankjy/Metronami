// This file contains every router file to load into express.

module.exports = (app) => {
    app.use('/', require('./manage'))
}
