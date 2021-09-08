const express = require('express')
const router = express.Router()

const { Network } = require('../models')
const uuid = require('uuid')

router.get('/network', async (req, res) => {
    // Return hello world
    const networks = await Network.findAll({ raw: true })

    const data = {
        data: {
            networks,
        },
    }
    return res.render('ui_less_manage/network', data)
})

router.post('/network', async (req, res) => {
    const { name, type, altName, desc } = req.body

    await Network.create({
        id: uuid.v4(),
        name: name,
        type: type,
        alt_name: altName,
        description: desc,
    })

    return res.render('ui_less_manage/network')
})

module.exports = router
