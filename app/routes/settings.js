const express = require('express')
const router = express.Router()

const { getUpdateInfo } = require('../boot/updater')

const fs = require('fs')

const { sequelize } = require('../models')

const version = require('../../package.json').version

router.get('/', (req, res) => {
    let earlyRelease = false
    if (version.includes('-alpha') || version.includes('-beta')) {
        earlyRelease = true
    }
    const data = {
        title: 'Settings',
        subtitle: 'About Metronami',
        layout: 'settings',
        nav: 'about',
        data: {
            version: version,
            earlyRelease: earlyRelease,
        },
    }
    return res.render('settings/about', data)
})

router.get('/update', async (req, res) => {
    let earlyRelease = false
    if (version.includes('-alpha') || version.includes('-beta')) {
        earlyRelease = true
    }

    const updateInfo = await getUpdateInfo()

    const data = {
        title: 'Settings',
        subtitle: 'Software Update',
        layout: 'settings',
        nav: 'update',
        data: {
            version: version,
            earlyRelease: earlyRelease,
            updateInfo: updateInfo,
        },
    }

    return res.render('settings/update', data)
})

router.post('/update', async (req, res) => {
    // Send loading page
    const data = {
        title: 'Settings',
        subtitle: 'Software Update',
        layout: 'settings',
        nav: 'update',
        data: {
            showUpdatingModal: true,
        },
    }

    res.render('settings/update', data)

    setTimeout(() => {
        process.exit(-11)
    }, 2000)
})

router.get('/system', (req, res) => {
    const data = {
        title: 'Settings',
        subtitle: 'System',
        layout: 'settings',
        nav: 'system',
        data: {

        },
    }
    return res.render('settings/system', data)
})

router.post('/system/init_system', (req, res) => {
    const { doAction } = req.body
    if (doAction !== 'INIT_RESTART') {
        return false
    }

    // Send loading page
    const data = {
        title: 'Settings',
        subtitle: 'System',
        layout: 'settings',
        nav: 'system',
        data: {
            showInitialisingModal: true,
        },
    }

    // Call function to initialise the system
    initSystem()

    return res.render('settings/system', data)
})

const initSystem = () => {
    // Shut down database
    sequelize.close().then(() => {
        // Delete database file
        const dbPath = `${__dirname}/../../data/metronami_userdata.ptn`
        fs.unlinkSync(dbPath)

        setTimeout(() => {
            process.exit(-10)
        }, 2000)
    })
}

module.exports = router
