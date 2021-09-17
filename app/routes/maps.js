const express = require('express')
const router = express.Router()

const uuid = require('uuid')

const { Network, Line, Station, Connection, Map } = require('../models')
const { NotificationCookie, FormRestoreCookie } = require('../helpers/cookie_options')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
    // Get list of all networks
    const networks = await Network.findAll({
        attributes: ['id', 'name'],
        raw: true,
    })

    // Get list of all maps
    const maps = await Map.findAll({
        attributes: ['id', 'name'],
        raw: true,
    })

    const data = {
        data: {
            networks,
            maps,
        },
        notification: req.cookies.notification || false,
    }
    return res.render('maps/index', data)
})

router.post('/', async (req, res) => {
    const { name, networkToMap } = req.body

    // Create new map
    await Map.create({
        id: uuid.v4(),
        name: name,
        network_id: networkToMap,
    })

    res.cookie('notification', `${name} has been created.`, NotificationCookie)
    return res.redirect('back')
})

router.get('/edit/:mapID', async (req, res) => {
    const { mapID } = req.params

    // Get current map
    const currentMap = await Map.findOne({
        where: { id: mapID },
        raw: true,
    })

    // Get current map's network
    const mapNetwork = await Network.findOne({
        where: {
            id: currentMap.network_id,
        },
        include: [
            {
                model: Line,
            },
        ],
    })

    // Data for rendering the map
    const Lines = await Line.findAll({
        where: {
            id: {
                [Op.in]: currentMap.lines_to_show.split(',') || [currentMap.lines_to_show],
            },
            network_id: currentMap.network_id,
        },
        include: [
            {
                model: Station,
                include: [
                    {
                        model: Connection,
                    },
                ],
            },
        ],
    })

    const data = {
        data: {
            currentMap: currentMap,
            mapNetwork: mapNetwork,
            selectedLines: Lines,
        },
        layout: 'map_editor',
    }
    return res.render('maps/editor', data)
})

router.post('/edit/:mapID', async (req, res) => {
    const { mapID } = req.params
    const { linesToDisplay } = req.body

    let linesToDisplayArray

    // Check whether linesToDisplay is valid
    if (!linesToDisplay) {
        linesToDisplayArray = []
    } else {
        // Check whether linesToDisplay is array
        if (!Array.isArray(linesToDisplay)) {
            // Convert linesToDisplay to array
            linesToDisplayArray = linesToDisplay.split(',')
        } else {
            linesToDisplayArray = linesToDisplay
        }
    }

    // Update map to store linesToDisplay
    await Map.update({
        lines_to_show: linesToDisplayArray.toString(),
    }, {
        where: {
            id: mapID,
        },
    })

    return res.redirect('back')
})

router.post('/:mapID/edit_options', async (req, res) => {
    const { mapID } = req.params
    const { name, doAction } = req.body

    // Check whether is request is to delete map
    if (doAction === 'DELETE') {
        await Map.destroy({
            where: {
                id: mapID,
            },
        })

        res.cookie('notification', `${name} has been deleted.`, NotificationCookie)
        return res.redirect('/maps')
    }

    // If not, update map with new values provided
    await Map.update({
        name: name,
    }, {
        where: {
            id: mapID,
        },
    })

    return res.redirect('back')
})

module.exports = router
