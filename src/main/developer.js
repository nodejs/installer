const { BrowserWindow } = require('electron')
const devtron = require('devtron')

const { logger } = require('../logger')

class DeveloperFeatures {
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

module.exports = { DeveloperFeatures }
