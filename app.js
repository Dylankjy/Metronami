// Boot
const boot = require('./app/boot/boot')

// Express
const express = require('express')
const app = express()
app.use('/', express.static('public'))
app.use('/third_party', express.static('third_party'))

// BodyParser
app.use(express.urlencoded({ extended: true }))

// CookieParser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Handlebars
const exphbs = require('express-handlebars')
app.set('views', [`views`])
app.set('view engine', 'hbs')
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: `views/layouts`,
    helpers: require('./app/helpers/handlebars'),
}))

// Routes
require('./app/routes/routes')(app)

// Open in browser
const open = require('open')
const chalk = require('chalk')

const webserverPort = 3000

const webserver = () => {
    app.listen(webserverPort, (err) => {
        if (err) {
            console.log(`\x1b[1m\x1b[2m[WEBSERVER] - \x1b[0m\x1b[1m\x1b[31m\x1b[5mFAILED\x1b[0m\x1b[31m: Unable to bind to port 5000. Could there possibly be another instance alive?\x1b[0m`)
            process.exit(1)
        }
        // console.log(`\x1b[1m\x1b[2m[WEBSERVER] - \x1b[1m\x1b[34mOK\x1b[0m: Webserver binded on port ${webserverPort} | http://localhost:${webserverPort}\x1b[0m`)
        console.log(`${chalk.greenBright('Loaded and ready: ')}${chalk.whiteBright('Launching Metronami in your browser...')}`)
        open(`http://localhost:${webserverPort}`)

        setTimeout(() => {
            console.log(`${chalk.cyan('Nothing happened? ')}${chalk.whiteBright('You may manually access Metronami at http://localhost:' + webserverPort)}`)
        }, 5000)
    })
}

// Load SQLize models
boot().then(() => {
    require('./app/models').sequelize.sync().then(() => {
        webserver()
    })
})
