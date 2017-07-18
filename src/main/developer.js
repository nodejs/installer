const { BrowserWindow } = require('electron')
const devtron = require('devtron')

class DeveloperFeatures {
  constructor () {
    this.extensions = BrowserWindow.getDevToolsExtensions()
    this.installDevtron()
  }

  installDevtron () {
    // We're checking first if devtron is already installed
    // If it isn't, we'll install it
    if (!this.extensions || !this.extensions.devtron) {
      devtron.install()
    }
  }
}

module.exports = { DeveloperFeatures }
