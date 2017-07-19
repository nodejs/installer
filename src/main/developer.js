import { BrowserWindow } from 'electron'
import devtron from 'devtron'

import { logger } from '../logger'

export class DeveloperFeatures {
  constructor () {
    this.extensions = BrowserWindow.getDevToolsExtensions()
    this.installDevtron()
  }

  installDevtron () {
    // We're checking first if devtron is already installed
    // If it isn't, we'll install it
    if (!this.extensions || !this.extensions.devtron) {
      logger.info('DevTron not installed, now installing as extension')
      devtron.install()
    }
  }
}
