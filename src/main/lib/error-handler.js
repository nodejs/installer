const { app, clipboard, dialog, shell } = require('electron')
const os = require('os')

// Reporting an unexpected error and closing the application
function reportError (win, error) {
  dialog.showMessageBox(win, {
    type: 'error',
    title: 'Node.js Installer',
    message: 'There was an unexpected error, the error stack will be copied to the clipboard in case you decide to report it, the installer will shut down',
    buttons: ['Report and exit', 'Exit']
  }, (response) => {
    if (response === 0) {
      clipboard.writeText(error)
      shell.openExternal('https://github.com/nodejs/installer/issues/new')
    }

    app.exit(1)
  })
}

// Configure basic errors for the installer
function setupErrorHandler (win) {
  win.webContents.on('crashed', () => {
    const errorMesage = 'The installer window crashed:' +
    `Platform:  ${os.platform()}` +
    `Installer version: ${app.getVersion()}` +
    `Electron version: ${process.versions.electron}`

    reportError(win, errorMesage)
  })

  process.on('uncaughtException', (error) => {
    reportError(win, error.message)
  })

  win.on('unresponsive', () => {
    dialog.showMessageBox(win, {
      type: 'warning',
      title: 'Node.js Installer',
      message: 'A process is taking too long, you could wait or close the installer',
      buttons: ['Wait', 'Exit']
    }, (response) => {
      if (response === 1) {
        app.exit(1)
      }
    })
  })
}

module.exports = {
  setupErrorHandler: setupErrorHandler,
  reportError: reportError
}
