const { BrowserWindow } = require('electron')
const windowStateKeeper = require('electron-window-state');

class WindowManager {
  /**
   * Creates a "main" browserWindow.
   *
   * @returns {Electron.BrowserWindow}
   * @memberof WindowManager
   */
  createMainWindow () {
    const mainWindowState = windowStateKeeper({
      defaultWidth: 1000,
      defaultHeight: 700
    })

    const browserWindow = new BrowserWindow({
      width: 1000,
      height: 700,
      show: false,
      x: mainWindowState.x,
      y: mainWindowState.y,
      width: mainWindowState.width,
      height: mainWindowState.height
    })

    mainWindowState.manage(browserWindow)

    return browserWindow
  }
}

const windowManager = new WindowManager()

module.exports = { windowManager }
