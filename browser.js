'use strict'
/* globals alert */

const semver = require('semver')

const getInstalledVersion = require('./lib/check-node')
const loadVersions = require('./lib/load.js')
// const install = require('./lib/install')
// for testing purpose
const fakeInstall = (v, cb) => {
  console.log('fake install', v)
  setTimeout(() => {
    cb(null, v)
  }, 10000)
}

const errIcon = '<i class="fa fa-exclamation-triangle"></i>'
const writeHTML = (e, h) => { e.innerHTML = h }
const domElement = e => document.querySelector(e)
const compare = (a, l) => semver.lt(a, l)
const major = v => v.split('.')[0]

const installing = {
  run: false,
  start: function () {
    domElement('#installing').style.display = 'block'
    this.run = true
  },
  done: function () {
    domElement('#installing').style.display = 'none'
    this.run = false
  }
}

// Sets the text of the 'installed version' label
getInstalledVersion((err, version) => {
  writeHTML(domElement('#installed-version span'), err ? errIcon : `v${version}`)
})

// Sets the text of the 'install version' buttons
loadVersions((err, versions) => {
  // get versions
  const stable = versions.latestLTS().version
  const latest = versions.latest().version

  // write versions into buttons
  writeHTML(domElement('#install-stable span'), err ? errIcon : stable)
  writeHTML(domElement('#install-latest span'), err ? errIcon : latest)

  // checks if needs to update nodejs
  getInstalledVersion((err, actual) => {
    if (err) return
    const updateButton = domElement('#update-to')
    // checks if stable is up to date
    if (major(actual) === major(stable) && compare(actual, stable)) {
      updateButton.style.display = 'inline-block'
      writeHTML(updateButton.children[1], stable)
    // checks if latest is up to date
    } else if (major(actual) <= major(latest) && compare(actual, latest)) {
      updateButton.style.display = 'inline-block'
      writeHTML(updateButton.children[1], latest)
    }
  })
})

// Install events listener for 'install version' buttons
function installEvent (e) {
  if (!installing.run) {
    installing.start()
    // gets version number from button text
    const version = this.children[1].innerHTML.slice(1)
    fakeInstall(version, (err, v) => {
      if (err) console.log(err)
      console.log('Done!', v)
      writeHTML(domElement('#installed-version span'), `v${version}`)
      domElement('#update-to').style.display = 'none'
      installing.done()
    })
  } else {
    alert('Already performing an installation!')
  }
}

domElement('#install-stable').addEventListener('click', installEvent)
domElement('#install-latest').addEventListener('click', installEvent)
domElement('#update-to').addEventListener('click', installEvent)

