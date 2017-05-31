const { app, BrowserWindow } = require('electron')

// If the executing binary is named `electron`, we're running
// in developer mode - otherwise, it'd be `installer`.
const isDevMode = process.execPath.match(/[\\/]electron/)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

/**
 * This is the main method executed in the main process.
 */
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    resizable: false,
    show: false
  })

  // Load the index.html of the app. Once loaded, we'll display
  // the window.
  mainWindow.loadURL(`file://${__dirname}/../renderer/index.html`)
  mainWindow.webContents.on('did-finish-load', () => mainWindow.show())

  // Open the DevTools, if we're in developer mode
  if (isDevMode) {
    mainWindow.webContents.openDevTools()
  }

  // Chromium drag and drop events tend to navigate the app away, making the
  // app impossible to use without restarting. These events should be prevented.
  mainWindow.webContents.on('will-navigate', (event) => event.preventDefault())

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
