// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var request = require('request').defaults({json:true})
var versions = require('./versions')

module.exports = function (cb) {
  request('https://nodejs.org/dist/index.json', (err, resp, index) => {
    if (err) return cb(err)
    if (resp.statusCode !== 200) {
      return cb(new Error('Status not 200, '+resp.statusCode))
    }
    cb(null, versions(index))
  })
}

