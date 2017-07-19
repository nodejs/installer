import { app, shell, Menu } from 'electron'
import { isDevMode } from '../utils/is-dev-mode'
import { logger } from '../logger'

function getApplicationMenuTemplate () {
  const template = [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click (item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.reload()
            }
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
          click (item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click (item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.toggleDevTools()
            }
          }
        }
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        }
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Open Repository...',
          click () {
            shell.openExternal('https://github.com/nodejs/installer')
          }
        }
      ]
    }
  ]

  return template
}

/**
 * Inserts the typical "Installer" menu found on macOS
 *
 * @param {Object} template
 * @returns {Object} Electron menu template
 */
function insertAppMenu (template) {
  if (process.platform === 'darwin') {
    const name = app.getName()
    template.unshift({
      label: name,
      submenu: [
        {
          label: 'About ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide ' + name,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click () {
            app.quit()
          }
        }
      ]
    })
  }

  return template
}

/**
 * Inserts the Electron process manager (if running in dev mode)
 *
 * @param {Object} template
 * @returns {Object} Electron menu template
 */
export function insertProcessManager (template) {
  if (isDevMode()) {
    const viewMenu = template.find(v => v.label === 'View')

    if (viewMenu && viewMenu.submenu) {
      viewMenu.submenu.push({
        label: 'Open Process Manager',
        click (_item, _focusedWindow) {
          require('electron-process-manager').openProcessManager()
        }
      })
    }
  }

  return template
}

export function setupApplicationMenu () {
  logger.debug('WindowMenu: Creating application menu')
  const template = getApplicationMenuTemplate()

  // Insert additional items
  insertAppMenu(template)
  insertProcessManager(template)

  const builtMenu = Menu.buildFromTemplate(template)

  Menu.setApplicationMenu(builtMenu)
}
