const semver = require('semver')
const getTagFor = require('get-github-tag')
const download = require('download')

const currentVersion = require('../../package.json').version
const chalk = require('chalk')

const updater = () => {
    return new Promise((resolve) => {
        getTagFor('hiyamashu', 'Metronami', '').then((tag) => {
            const tagCleaned = semver.clean(tag)
            if (semver.lt(currentVersion, tagCleaned) === false) {
                console.log(chalk.white('You are running the latest version of Metronami.'))
                return resolve()
            }

            console.log(chalk.greenBright(`New update found: ${tag}`))

            // Url of the image
            const file = `https://github.com/hiyamashu/Metronami/archive/refs/tags/${tag}.zip`
            const filePath = `./updates`

            download(file, filePath)
                .then(() => {
                    console.log(chalk.whiteBright('Update has been downloaded. You can access Metronami Settings to perform automatic system update.'))
                })

            return resolve()
        })
    })
}

const getUpdateInfo = () => {
    return new Promise((resolve) => {
        // Check for updates
        getTagFor('hiyamashu', 'Metronami', '').then((tag) => {
            const tagCleaned = semver.clean(tag)
            if (semver.lt(version, tagCleaned) === false) {
                return resolve(false)
            }

            return resolve(tag)
        })
    })
}

module.exports = {
    updater,
    getUpdateInfo,
}
