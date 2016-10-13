const request = require('request')
const semver = require('semver')
const osenv = require('osenv')
const path = require('path')
const once = require('once')
const fs = require('fs')
const sudo = require('electron-sudo')

const checkNode = require('./check-node')

function downloadAndInstallInfo () {
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
  }
}

module.exports = function install (version, cb) {
  version = semver.valid(version)
  cb = once(cb)
  const info = downloadAndInstallInfo()
  const u = info.url(version)
  const filename = path.basename(u)
  const p = path.join(osenv.tmpdir(), filename)
  console.log(u, p)
  const file = fs.createWriteStream(p)
  request(u).on('error', cb).pipe(file).on('close', () => {
    const command = info.install(p)

    const sudoOpts = {
      name: 'Install Node',
      // icns: '/path/to/icns/file' // (optional, only for MacOS),
      process: {
        on: (ps) => {
          ps.stdout.pipe(process.stdout)
          ps.stderr.pipe(process.stderr)
        }
      }
    }
    sudo.exec(command, sudoOpts, (err) => {
      if (err) return cb(err, null)
      checkNode(cb)
    })
  })
}
