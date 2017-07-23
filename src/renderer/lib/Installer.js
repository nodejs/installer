import { EventEmitter } from 'events'
import fs from 'fs'
import osenv from 'osenv'
import path from 'path'
import request from 'request'
import semver from 'semver'
import Sudoer from 'electron-sudo'

export class Installer extends EventEmitter {
  constructor (version) {
    super()
    this._rawVersion = version
    this.version = semver.valid(version)
    this._cancel = false
  }

  _emitError (msg) {
    this.emit('error', new Error(msg))
  }

  _getDownloadAndInstallInfo () {
    const base = 'https://nodejs.org/dist'

    switch (process.platform) {
      case 'darwin':
        return {
          url: version => `${base}/v${version}/node-v${version}.pkg`,
          install: path => `installer -pkg ${path} -target /`
        }
      case 'linux':
        return {
          url: version => `${base}/v${version}/node-v${version}-linux-${process.arch}.tar.gz`,
          install: path => `tar --strip=1 -C /usr/local -oxf ${path}`
        }
      case 'win32':
        return {
          url: version => `${base}/v${version}/node-v${version}-${process.arch}.msi`,
          install: path => `msiexec /qb /i ${path}`
        }
      default:
        return null
    }
  }

  cancel () {
    this._cancel = true
    this.emit('cancel')
  }

  install () {
    const info = this._getDownloadAndInstallInfo()
    if (!info) {
      return this._emitError(`The installer doesn't current support the ${process.platform} platform`)
    }
    if (!this.version) {
      return this._emitError(`The provided version: ${this._rawVersion} is not a valid version`)
    }
    const downloadUrl = info.url(this.version)
    const fileName = path.basename(downloadUrl)
    const downloadPath = path.resolve(osenv.tmpdir(), fileName)

    const cleanup = () => fs.unlink(downloadPath, () => {})

    const file = fs.createWriteStream(downloadPath)

    this.on('cancel', () => {
      try {
        file.close()
      } catch (err) {
        // Ignore
      }
    })

    request(downloadUrl)
      .on('error', (err) => {
        fs.unlink(downloadPath)
        this.emit('error', err)
      })
      .pipe(file)
      // TODO: Emit download progress to show progress on screen
      .on('close', () => {
        if (this._cancel) return

        const installCommand = info.install(downloadPath)

        const sudoOptions = {
          name: 'Install Node',
          process: {
            on: (ps) => {
              ps.stdout.pipe(process.stdout)
              ps.stderr.pipe(process.stderr)
            }
          }
        }

        const sudo = new Sudoer(sudoOptions)
        if (process.platform === 'win32') {
          // Safety wipe
          const elevatePath = path.resolve(osenv.tmpdir(), 'elevate.exe')
          if (fs.existsSync(elevatePath)) fs.unlinkSync(elevatePath)
          sudo.bundled = path.resolve(__dirname, '../../../node_modules/electron-sudo', sudo.bundled)
        }

        sudo.exec(installCommand, sudoOptions)
          .then(() => {
            cleanup()
            this.emit('done')
          })
          .catch((err) => {
            cleanup()
            this.emit('error', err)
          })
      })
  }
}
