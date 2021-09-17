const execa = require('execa');

(async () => {
    while (true) {
        try {
            const { stdout } = await execa('node app.js', { stdio: 'inherit' })
        } catch (exitData) {
            // If the process exited with a non-zero code and it isn't the restart signal
            // then close the process and exit the loop
            if (exitData.exitCode !== 1) {
                console.error(exitData)
                return process.exit(1)
            }

            // Otherwise, restart the process
            if (exitData.exitCode === 1) {
                console.log('[LOADER] Restart requested')
                continue
            }

            // Otherwise, close process
            process.exit(0)
        }
    }
})()
