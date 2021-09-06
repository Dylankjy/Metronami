const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    // Return hello world
    return res.send('Hello World')
})

module.exports = router
