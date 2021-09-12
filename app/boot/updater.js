const semver = require('semver')
const getTagFor = require('get-github-tag')
const download = require('download')

const currentVersion = require('../../package.json').version
const chalk = require('chalk')

const updater = () => {
    return new Promise((resolve) => {
        getTagFor('hiyamashu', 'Metronami', '').then((tag) => {
            if (semver.satisfies(currentVersion, `>=${tag}`) === true) {
                return resolve()
            }

            console.log(chalk.greenBright(`New update found: ${tag}`))

            // Url of the image
            const file = `https://github.com/hiyamashu/Metronami/archive/refs/tags/${tag}.zip`
            const filePath = `./updates`

            download(file, filePath)
                .then(() => {
                    console.log(chalk.whiteBright('Update downloaded into /updates. Please update Metronami at your nearest convenience.'))
                })

            resolve()
        })
    })
}

module.exports = updater
