'use strict'

const examples = [{
  title: 'A simple http file server',
  code: `
const http = require('http')
const fs = require('fs')

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' })
  fs.createReadStream('./file.txt').pipe(res)
})

server.listen(3000)`
}, {
  title: 'A simple http server',
  code: `
const http = require('http')

const server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World')
})

server.listen(8000, function (error) {
  if (error) console.log(error)
  console.log('Server running at http://127.0.0.1:8000/')
})`
}, {
  title: 'Line count of a file',
  code: `
const fs = require('fs')
// Reads the first argoment in your CLI,
// eg: '$ node index.js filename.txt'
const file = process.argv[2]

fs.readFile(file, function (err, contents) {
  if (err) console.log(err)
  const lines = contents.toString().split('\\n').length - 1
  console.log(lines)
})
`}]

module.exports = (callback) => {
  callback(null, examples[Math.floor(Math.random() * examples.length)])
}
