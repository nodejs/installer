import log from 'electron-log'

import { isDevMode } from './utils/is-dev-mode'

/**
 * A logger that ensures logging to file (if in production mode)
 * or to the good old console (if in development mode). Log file
 * locations:
 *
 * on Linux: ~/.config/<app name>/log.log
 * on OS X: ~/Library/Logs/<app name>/log.log
 * on Windows: %USERPROFILE%\AppData\Roaming\<app name>\log.log
 *
 * @class Logger
 */
class Logger {
  /**
   * Creates an instance of Logger.
   */
  constructor () {
    // If we're in production mode, we'll log to file using
    // electron-log. By default, the module will only write
    // warn and error messages.
    //
    // If we're in development mode, we'll simply log to con-
    // sole only.
    if (isDevMode()) {
      this.module = console
    } else {
      this.module = log
    }
  }

  warn (...args) {
    return this.module.warn(...args)
  }

  error (...args) {
    return this.module.error(...args)
  }

  info (...args) {
    return this.module.info(...args)
  }

  debug (...args) {
    if (this.module.debug) {
      return this.module.debug(...args)
    } else {
      // The main process doesn't have console.debug
      return this.module.info(...args)
    }
  }
}

export const logger = new Logger()
