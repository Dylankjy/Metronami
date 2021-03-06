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
    select(selected, options) {
        let html = options.fn(this)

        if (selected) {
            const values = selected.split(',')
            const length = values.length

            for (let i = 0; i < length; i++) {
                html = html.replace( new RegExp(' value=\"' + values[i] + '\"'), '$& selected="selected"')
            }
        }

        return html
    },
    lengthOfList: (list) => {
        return list.length
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
    ifIncludes(list, value, options) {
        // Convert to array if not already
        if (!Array.isArray(list)) {
            list = list.split(',')
        }

        if (list.includes(value)) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    },
}
