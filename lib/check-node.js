const exec = require('child_process').exec
const semver = require('semver')

module.exports = (cb) => {
  exec('node --version', (error, stdout, stderr) => {
    if (error) return cb(error, null)
    const output = (stdout + stderr).replace(/(\r\n|\n|\r| )/gm, '')
    const sem = semver.valid(output)
    if (sem) return cb(null, sem)
    cb(new Error(output), null)
  })
}
