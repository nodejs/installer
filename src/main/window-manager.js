import { BrowserWindow } from 'electron'
import windowStateKeeper from 'electron-window-state'

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
      show: false,
      x: mainWindowState.x,
      y: mainWindowState.y,
      width: mainWindowState.width,
      height: mainWindowState.height,
      minHeight: 450
    })

    mainWindowState.manage(browserWindow)

    return browserWindow
  }
}

export const windowManager = new WindowManager()
