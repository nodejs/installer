const request = require('request')
const exec = require('child_process').exec
const semver = require('semver')
const osenv = require('osenv')
const path = require('path')
const once = require('once')
const fs = require('fs')
const sudo = require('electron-sudo')

const checkNode = require('./check-node')

function downloadAndInstallInfo () {
  const base = `https://nodejs.org/dist`

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

module.exports = function install (version, update, cb) {
  // TODO: Support more than just Mac and Linux
  version = semver.valid(version)
  cb = once(cb)
  var info = downloadAndInstallInfo()
  var u = info.url(version)
  var filename = path.basename(u)
  var p = path.join(osenv.tmpdir(), filename)
  console.log(u, p)
  var file = fs.createWriteStream(p)
  request(u).on('error', cb).pipe(file).on('close', () => {

    var command = info.install(p)

    var sudoOpts = {
      name: `Install Node`,
      // icns: '/path/to/icns/file' // (optional, only for MacOS), 
      process: {
        on: function(ps) {
          ps.stdout.pipe(process.stdout)
          ps.stderr.pipe(process.stderr)
        }
      }
    }
    update()
    sudo.exec(command, sudoOpts, (err) => {
      if (err) return cb(err)
      checkNode(cb)
    })
  })
}
