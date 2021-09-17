
const uuid = require('uuid')

const { Network, Line, Station, Connection, Map } = require('../models')
const { NotificationCookie, FormRestoreCookie } = require('../helpers/cookie_options')
const { Op } = require('sequelize')

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

module.exports = router
