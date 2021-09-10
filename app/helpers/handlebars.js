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
    select(value, options) {
        return options.fn(this)
            .split('\n')
            .map((v) => {
                const t = 'value="' + value + '"'
                return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
            })
            .join('\n')
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
