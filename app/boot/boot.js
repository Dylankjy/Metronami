const updater = require('./updater')

const chalk = require('chalk')
const packageInfo = require('../../package.json')

const boot = () => {
    return new Promise((resolve) => {
        console.log(chalk.blueBright('Metronami') + ' ' + chalk.whiteBright(`v${packageInfo.version}`))
        console.log(chalk.gray('Repo: https://github.com/hiyamashu/Metronami | Licensed under GPL v3.0'))
        if (packageInfo.version.includes('-beta') || packageInfo.version.includes('-alpha')) {
            console.log(chalk.red('This is a beta/alpha version of Metronami. Always keep a backup of your data. Report any bugs if you find any.'))
        }
        updater().then(() => {
            setTimeout(() => {
                resolve()
            }, 5000)
        })
    })
}

module.exports = boot
