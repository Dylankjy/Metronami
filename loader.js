const execa = require('execa')

// Updater
const { getUpdateInfo } = require('./app/boot/updater')
const extract = require('extract-zip')
const fs = require('fs');

(async () => {
    while (true) {
        try {
            const { stdout } = await execa('node app.js', { stdio: 'inherit' })
        } catch (exitData) {
            // Otherwise, restart the process
            if (exitData.exitCode === 1) {
                console.log('[LOADER] Restart requested')
                continue
            }

            // Update mode
            if (exitData.exitCode === 2) {
                console.log('[LOADER] Update operation in progress')
                const tag = await getUpdateInfo()

                // Delete operation
                fs.rmdirSync('./app', { recursive: true })
                fs.rmdirSync('./public', { recursive: true })
                fs.rmdirSync('./node_modules', { recursive: true })
                fs.rmdirSync('./third_party', { recursive: true })
                fs.rmdirSync('./views', { recursive: true })

                // Unpack Update package
                await extract(`./updates/Metronami-${tag}.zip`, { dir: __dirname })
                continue
            }

            // If the process exited with a non-zero code and it isn't the restart signal
            // then close the process and exit the loop
            if (exitData.exitCode !== 0) {
                console.error(exitData)
                return process.exit(1)
            }

            // Otherwise, close process
            process.exit(0)
        }
    }
})()
