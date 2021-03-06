const chalk = require('chalk')
const express = require('express')
const router = express.Router()
const { Network, Line, Station } = require('../models')

router.get('/', async (req, res) => {
    // Get list of networks
    const networks = await Network.findAll({ include: [{ model: Line }, { model: Station }] })

    const data = {
        title: 'Home',
        data: {
            networks: networks,
        },
        notification: req.cookies.notification || false,
    }
    return res.render('index', data)
})

router.post('/shutdown', (req, res) => {
    res.render('shutdown')
    console.log(chalk.greenBright('Metronami has shut down. You may now safely close this window.'))
    setTimeout(() => {
        return process.exit(203)
    }, 3000)
})

module.exports = router
