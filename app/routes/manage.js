const express = require('express')
const router = express.Router()

const uuid = require('uuid')

const { Network, Line, Station, Connection } = require('../models')
const { NotificationCookie, FormRestoreCookie } = require('../helpers/cookie_options')
const { Op } = require('sequelize')

// GET /manage/networks - List all networks
router.get('/', async (req, res) => {
    const { notification } = req.cookies

    const NetworkList = await Network.findAll({ raw: true })

    const data = {
        title: 'Manage Networks',
        data: {
            networks: NetworkList,
        },
        notification: notification || false,
    }
    return res.render('manage/index', data)
})

router.post('/add_network', async (req, res) => {
    const { name, altName, desc } = req.body

    await Network.create({
        id: uuid.v4(),
        name: name,
        alt_name: altName,
        description: desc,
    })

    res.cookie('notification', `${name} has been created.`, NotificationCookie)
    return res.redirect('/manage')
})

// GET /manage/networks/:id - List network details
router.get('/network/:networkID', async (req, res) => {
    const { networkID } = req.params

    const CurrentNetwork = await Network.findOne({
        where: {
            id: networkID,
        },
        raw: true,
    })

    const data = {
        title: 'Editing ' + CurrentNetwork.name,
        nav: 'home',
        data: {
            currentNetwork: CurrentNetwork,
        },
        layout: 'editor',
        notification: req.cookies.notification || false,
    }

    res.clearCookie('notification')
    return res.render('manage/network', data)
})

router.post('/network/:networkID', async (req, res) => {
    const { name, altName, desc } = req.body
    const { networkID } = req.params

    await Network.update({
        name: name,
        alt_name: altName,
        description: desc,
    }, {
        where: {
            id: networkID,
        },
    })

    res.cookie('notification', 'Your changes has been saved.', NotificationCookie)
    return res.redirect(`/manage/network/${networkID}`)
})

// GET /network/:networkID/lines - List lines in network
router.get('/network/:networkID/lines', async (req, res) => {
    const { networkID } = req.params

    const CurrentNetwork = await Network.findOne({
        where: {
            id: networkID,
        },
        raw: true,
    })

    const Lines = await Line.findAll({ where: { network_id: networkID }, raw: true })

    const data = {
        title: 'Manage Lines for ' + CurrentNetwork.name,
        nav: 'lines',
        data: {
            lines: Lines,
            currentNetwork: CurrentNetwork,
        },
        layout: 'editor',
        notification: req.cookies.notification || false,
    }

    res.clearCookie('notification')
    return res.render('manage/lines', data)
})

router.post('/network/:networkID/lines', async (req, res) => {
    const { networkID } = req.params
    const { name, altName, lineColor, type, desc } = req.body

    await Line.create({
        id: uuid.v4(),
        name: name,
        alt_name: altName,
        color: lineColor,
        type: type,
        description: desc,
        network_id: networkID,
    })

    res.cookie('notification', `${name} has been created.`, NotificationCookie)
    return res.redirect(`/manage/network/${networkID}/lines`)
})

// GET /network/:networkID/lines/:lineID - List line details
router.get('/network/:networkID/lines/:lineID', async (req, res) => {
    const { networkID, lineID } = req.params

    const CurrentNetwork = await Network.findOne({
        where: {
            id: networkID,
        },
        raw: true,
    })

    const CurrentLine = await Line.findOne({
        where: {
            id: lineID,
        },
        raw: true,
    })

    const data = {
        title: 'Edit ' + CurrentNetwork.name,
        nav: 'lines',
        data: {
            currentNetwork: CurrentNetwork,
            currentLine: CurrentLine,
        },
        layout: 'editor',
        notification: req.cookies.notification || false,
    }

    res.clearCookie('notification')
    return res.render('manage/edit/lines', data)
})

router.post('/network/:networkID/lines/:lineID', async (req, res) => {
    const { networkID, lineID } = req.params
    const { name, altName, lineColor, type, desc, doAction } = req.body

    // Delete Line
    // using both ID and network_id to ensure that correct station gets deleted even in the event of uuid collision
    if (doAction === 'DELETE') {
        await Line.destroy({
            where: {
                id: lineID,
                network_id: networkID,
            },
        })

        res.cookie('notification', `${name} has been deleted.`, NotificationCookie)
        return res.redirect(`/manage/network/${networkID}/lines`)
    }

    // Update Line
    await Line.update({
        name: name,
        alt_name: altName,
        color: lineColor,
        type: type,
        description: desc,
    }, {
        where: {
            id: lineID,
        },
    })

    res.cookie('notification', `Changes for ${name} has been applied.`, NotificationCookie)
    return res.redirect(`/manage/network/${networkID}/lines`)
})

// GET /network/:networkID/stations - List all stations in network
router.get('/network/:networkID/stations', async (req, res) => {
    const { networkID } = req.params

    const CurrentNetwork = await Network.findOne({
        where: {
            id: networkID,
        },
        raw: true,
    })

    const Lines = await Line.findAll({ where: { network_id: networkID }, raw: true })
    const Stations = await Station.findAll({ where: { network_id: networkID }, include: [{ model: Line, attributes: ['color'] }, { model: Connection }], raw: true })

    console.log(Stations)

    const data = {
        title: 'Manage Lines for ' + CurrentNetwork.name,
        nav: 'stations',
        data: {
            stations: Stations,
            lines: Lines,
            currentNetwork: CurrentNetwork,
        },
        layout: 'editor',
        notification: req.cookies.notification || false,
        restoreData: req.cookies.restoreData || '',
    }

    res.clearCookie('notification')
    return res.render('manage/stations', data)
})

router.post('/network/:networkID/stations', async (req, res) => {
    const { networkID } = req.params
    const { stationCode, name, altName, connection } = req.body

    await Station.create({
        id: uuid.v4(),
        station_code: stationCode,
        name: name,
        alt_name: altName,
        network_id: networkID,
        line_id: connection,
    })

    res.cookie('notification', `${name} has been created.`, NotificationCookie)
    return res.redirect(`/manage/network/${networkID}/stations`)
})

// GET /network/:networkID/stations/:stationID - List station details
router.get('/network/:networkID/stations/:stationID', async (req, res) => {
    const { networkID, stationID } = req.params

    const CurrentNetwork = await Network.findOne({
        where: {
            id: networkID,
        },
        raw: true,
    })

    const Lines = await Line.findAll({ raw: true })

    const CurrentStation = await Station.findOne({
        where: {
            id: stationID,
        },
        raw: true,
    })

    const data = {
        title: 'Edit ' + CurrentNetwork.name,
        nav: 'stations',
        data: {
            lines: Lines,
            currentNetwork: CurrentNetwork,
            currentStation: CurrentStation,
        },
        layout: 'editor',
        notification: req.cookies.notification || false,
    }

    res.clearCookie('notification')
    return res.render('manage/edit/stations', data)
})

router.post('/network/:networkID/stations/:stationID', async (req, res) => {
    const { networkID, stationID } = req.params
    const { stationCode, name, altName, connection } = req.body

    await Station.update({
        station_code: stationCode,
        name: name,
        alt_name: altName,
        line_id: connection,
    }, {
        where: {
            id: stationID,
        },
    })

    res.cookie('notification', `Changes for ${name} has been applied.`, NotificationCookie)
    return res.redirect(`/manage/network/${networkID}/stations`)
})

// POST /network/:networkID/stations/add_connection - Add new connections
router.post('/network/:networkID/add_connection', async (req, res) => {
    const { networkID } = req.params
    const { stationCodes } = req.body

    const newConnectionID = uuid.v4()

    // Convert stationCodes (str) into array. Remove all spaces in the process.
    const stationCodesList = stationCodes.replace(/\s/g, '').split(',')

    // Check whether stations in list already have a connection.
    const stationsWithConnection = await Station.findAll({
        where: {
            station_code: stationCodesList,
            connection_id: { [Op.not]: null },
            network_id: networkID,
        },
        raw: true,
    })

    // Check whether stations in list are valid.
    const stationsThatExist = await Station.findAll({
        where: {
            station_code: stationCodesList,
            network_id: networkID,
        },
        raw: true,
    })

    // If one or more stations don't exist, prevent user from adding connection.
    if (stationsThatExist.length !== stationCodesList.length) {
        const listOfValidStationsCode = stationsThatExist.map((station) => station.station_code).join(', ')
        if (listOfValidStationsCode.length === 0) {
            res.cookie('notification', 'None of the station codes for the connection are valid. Please check your input and try again.', NotificationCookie)
        } else {
            res.cookie('notification', `One or more stations in the connection are not valid. The following are valid: ${listOfValidStationsCode}. Please check your input and try again.`, NotificationCookie)
        }
        res.cookie('restoreData', stationCodes, FormRestoreCookie)
        return res.redirect(`/manage/network/${networkID}/stations`)
    }

    // If one or more stations already have a connection, prevent user from adding connection.
    if (stationsWithConnection.length > 0) {
        res.cookie('notification', `The following station(s) already have a connection: ${stationsWithConnection.map((station) => `${station.name} (${station.station_code})`).join(', ')}`, NotificationCookie)
        res.cookie('restoreData', stationCodes, FormRestoreCookie)
        return res.redirect(`/manage/network/${networkID}/stations`)
    }

    // Update Line
    await Connection.create({
        id: newConnectionID,
        network_id: networkID,
    })

    for (let i = 0; i < stationCodesList.length; i++) {
        await Station.update({
            connection_id: newConnectionID,
        }, {
            where: {
                station_code: stationCodesList[i],
            },
        })
    }

    res.cookie('notification', `Connection created for station codes: ${stationCodesList.toString()}`, NotificationCookie)
    return res.redirect(`/manage/network/${networkID}/stations`)
})

// GET /network/:networkID/stations/:stationID - List station details
router.get('/network/:networkID/connections/:connectionID', async (req, res) => {
    const { networkID, connectionID } = req.params

    const CurrentNetwork = await Network.findOne({
        where: {
            id: networkID,
        },
        raw: true,
    })

    const CurrentConnection = await Connection.findOne({
        where: {
            id: connectionID,
            network_id: networkID,
        },
        raw: true,
    })

    const CurrentConnectionStations = await Station.findAll({
        where: {
            connection_id: connectionID,
            network_id: networkID,
        },
        include: [{
            model: Line,
            attributes: ['color'],
        }],
        raw: true,
    })

    const data = {
        title: 'Edit ' + CurrentNetwork.name,
        nav: 'stations',
        data: {
            currentNetwork: CurrentNetwork,
            currentConnection: CurrentConnection,
            connectionStation: CurrentConnectionStations,
        },
        layout: 'editor',
        notification: req.cookies.notification || false,
    }

    res.clearCookie('notification')
    return res.render('manage/edit/connection', data)
})

router.post('/network/:networkID/connections/:connectionID', async (req, res) => {
    const { networkID, connectionID } = req.params
    const { stationCodes, removeAction } = req.body

    // Check whether request is not null
    if (removeAction) {
        const station = await Station.findOne({ where: { id: removeAction, network_id: networkID } })
        await Station.update({
            connection_id: null,
        }, {
            where: {
                id: removeAction,
            },
        })

        // If station is the last in a connection, delete the connection
        const stationsInConnection = await Station.findAll({
            where: {
                connection_id: connectionID,
                network_id: networkID,
            },
            raw: true,
        })
        if (stationsInConnection.length === 0) {
            await Connection.destroy({
                where: {
                    id: connectionID,
                },
            })

            res.cookie('notification', `Connection removed for ${station.name} (${station.station_code}) and deleted since there are no lines in the connection.`, NotificationCookie)
            return res.redirect(`/manage/network/${networkID}/stations`)
        }

        res.cookie('notification', `Connection removed for ${station.name} (${station.station_code})`, NotificationCookie)
        return res.redirect(`/manage/network/${networkID}/connections/${connectionID}`)
    }

    // Convert stationCodes (str) into array. Remove all spaces in the process.
    const stationCodesList = stationCodes.replace(/\s/g, '').split(',')

    // Check whether stations in list already have a connection.
    const stationsWithConnection = await Station.findAll({
        where: {
            station_code: stationCodesList,
            connection_id: { [Op.not]: null },
            network_id: networkID,
        },
        raw: true,
    })

    // Check whether stations in list are valid.
    const stationsThatExist = await Station.findAll({
        where: {
            station_code: stationCodesList,
            network_id: networkID,
        },
        raw: true,
    })

    // If one or more stations don't exist, prevent user from adding connection.
    if (stationsThatExist.length !== stationCodesList.length) {
        const listOfValidStationsCode = stationsThatExist.map((station) => station.station_code).join(', ')
        if (listOfValidStationsCode.length === 0) {
            res.cookie('notification', 'None of the station codes for the connection are valid. Please check your input and try again.', NotificationCookie)
        } else {
            res.cookie('notification', `One or more stations in the connection are not valid. The following are valid: ${listOfValidStationsCode}. Please check your input and try again.`, NotificationCookie)
        }
        res.cookie('restoreData', stationCodes, FormRestoreCookie)
        return res.redirect('back')
    }

    // If one or more stations already have a connection, prevent user from adding connection.
    if (stationsWithConnection.length > 0) {
        res.cookie('notification', `The following station(s) already have a connection: ${stationsWithConnection.map((station) => `${station.name} (${station.station_code})`).join(', ')}`, NotificationCookie)
        res.cookie('restoreData', stationCodes, FormRestoreCookie)
        return res.redirect('back')
    }

    for (let i = 0; i < stationCodesList.length; i++) {
        await Station.update({
            connection_id: connectionID,
        }, {
            where: {
                station_code: stationCodesList[i],
            },
        })
    }

    res.cookie('notification', `Connection created for station codes: ${stationCodesList.toString()}`, NotificationCookie)
    return res.redirect('back')
})

module.exports = router
