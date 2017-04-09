'use strict'
/* globals alert, Prism */

const semver = require('semver')

const getInstalledVersion = require('./lib/check-node')
const loadVersions = require('./lib/load.js')
const installNode = require('./lib/install')
const getExample = require('./lib/examples')

// utility
const errIcon = '<i class="fa fa-exclamation-triangle"></i>'
const domElement = e => document.querySelector(e)
const writeHTML = (e, h) => { domElement(e).innerHTML = h }
const compare = (a, l) => semver.lt(a, l)
const major = v => v.split('.')[0]

const installing = {
  run: false,
  start() {
    domElement('#installing').style.display = 'block'
    this.run = true
  },
  done() {
    domElement('#installing').style.display = 'none'
    this.run = false
  }
}

// Sets the text of the 'installed version' label
getInstalledVersion((err, version) => {
  writeHTML('#installed-version span', err ? errIcon : `v${version}`)
})

// Sets the text of the 'install version' buttons
loadVersions((err, versions) => {
  // get versions
  const stable = versions.latestLTS().version
  const latest = versions.latest().version

  // write versions into buttons
  writeHTML('#install-stable span', err ? errIcon : stable)
  writeHTML('#install-latest span', err ? errIcon : latest)

  if (err) return

  // checks if needs to update nodejs
  getInstalledVersion((err2, actual) => {
    if (err2) return
    const updateButton = domElement('#update-to')
    // checks if stable is up to date
    if (major(actual) === major(stable) && compare(actual, stable)) {
      updateButton.style.display = 'inline-block'
      updateButton.children[1].innerHTML = stable
    // checks if latest is up to date
    } else if (major(actual) <= major(latest) && compare(actual, latest)) {
      updateButton.style.display = 'inline-block'
      updateButton.children[1].innerHTML = latest
    }
    // event listeners are attached after that the loadVersions retrieves the node versions
    domElement('#install-stable').addEventListener('click', installEvent)
    domElement('#install-latest').addEventListener('click', installEvent)
    domElement('#update-to').addEventListener('click', installEvent)
  })
})

// Install events listener for 'install version' buttons
function installEvent (e) {
  if (!installing.run) {
    installing.start()
    // gets version number from button text
    const version = this.children[1].innerHTML.slice(1)
    installNode(version, (err, v) => {
      if (err) {
        console.log(err)
        domElement('#installing .error-message').style.display = 'block'
        domElement('.sk-folding-cube').style.display = 'none'
        writeHTML('#error-text', err.message)
        return
      }
      console.log('Done!', v)
      writeHTML('#installed-version span', `v${version}`)
      domElement('#update-to').style.display = 'none'
      installing.done()
    })
  } else {
    alert('Already performing an installation!')
  }
}

function installErrorEvent (e) {
  domElement('#installing .error-message').style.display = 'none'
  domElement('.sk-folding-cube').style.display = 'block'
  writeHTML('#error-text', '')
  installing.done()
}

// Adds a random code example and refreshes Prism lib
getExample((title, code) => {
  writeHTML('#code-title', title)
  writeHTML('#code-example', code)
  Prism.highlightElement(domElement('#code-example'))
})

domElement('#error-button').addEventListener('click', installErrorEvent)
