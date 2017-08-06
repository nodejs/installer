import { BrowserWindow } from 'electron'
import devtron from 'devtron'
import * as electronCompile from 'electron-compile'
import installDevTools, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'

import { logger } from '../logger'

export class DeveloperFeatures {
  constructor () {
    this.extensions = BrowserWindow.getDevToolsExtensions()
    this.enableHMR()
    this.installDevtron()
    this.installReactTools()
  }

  enableHMR () {
    electronCompile.enableLiveReload({
      strategy: 'react-hmr'
    })
  }

  installDevtron () {
    // We're checking first if devtron is already installed
    // If it isn't, we'll install it
    if (!this.extensions || !this.extensions.devtron) {
      logger.info('DevTron not installed, now installing as extension')
      devtron.install()
    }
  }

  installReactTools () {
    installDevTools(REACT_DEVELOPER_TOOLS)
      .catch((err) => logger.error('Failed to install React dev tools', err))
  }
}
