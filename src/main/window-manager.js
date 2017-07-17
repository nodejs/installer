const { BrowserWindow } = require('electron')

class WindowManager {
  /**
   * Creates a "main" browserWindow.
   *
   * @returns {Electron.BrowserWindow}
   * @memberof WindowManager
   */
  createMainWindow () {
    return new BrowserWindow({
      width: 1000,
      height: 700,
      resizable: false,
      show: false
    })
  }
}

const windowManager = new WindowManager()

module.exports = { windowManager }
