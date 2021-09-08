// This file contains every router file to load into express.

module.exports = (app) => {
    app.use('/ui_less/manage', require('./ui_less_manage'))
    app.use('/manage', require('./manage'))
}
