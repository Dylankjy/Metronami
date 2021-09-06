const dateFormat = require('dateformat')

module.exports = {
    ifEquals(a, b, options) {
        if (a === b) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    },
    ifNotEquals(a, b, options) {
        if (a !== b) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    },
    parseISODateTime: (value) => {
        return dateFormat(value, 'dS mmmm yyyy, HH:MM:ss')
    },
    parseISODateOnly: (value) => {
        return dateFormat(value, 'dS mmmm yyyy')
    },
    parseISOTimeOnly: (value) => {
        return dateFormat(value, 'HH:MM')
    },
}
