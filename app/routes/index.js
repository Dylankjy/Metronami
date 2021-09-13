const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    return res.render('index')
})

router.post('/shutdown', (req, res) => {
    res.render('shutdown')
    console.log(chalk.greenBright('Metronami has shut down. It is now safe to close this window.'))
    return process.exit()
})

module.exports = router
