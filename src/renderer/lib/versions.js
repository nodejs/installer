const semver = require('semver')

function forceSort (dict) {
  function sorter (v1, v2) {
    const one = (semver.minor(v1) * 1000) + semver.patch(v1)
    const two = (semver.minor(v2) * 1000) + semver.patch(v2)
    return one - two
  }

  const keys = Object.keys(dict).sort(sorter).reverse()
  return keys.map((k) => dict[k])
}

function Versions (index) {
  this.index = index
  this.majors = {}
  this.lts = {}
  this.load()
}

Versions.prototype.load = () => {
  const index = this.index
  index.forEach((v) => {
    var m = semver.major(v.version)
    if (!this.majors[m]) this.majors[m] = {}
    this.majors[m][v.version] = v
    if (v.lts) {
      if (!this.lts[m]) this.lts[m] = {}
      this.lts[m][v.version] = v
    }
  })
  this._latest = 0
  for (let k in this.majors) {
    this.majors[k] = forceSort(this.majors[k])
    if (parseInt(k) > this._latest) this._latest = parseInt(k)
  }
  this._latestLTS = 0
  for (let k in this.lts) {
    this.lts[k] = forceSort(this.lts[k])
    if (parseInt(k) > this._latestLTS) this._latestLTS = parseInt(k)
  }
}

Versions.prototype.latest = (version) => {
  let major
  if (!version) major = this._latest
  else major = semver.major(version)
  if (!this.majors[major]) major = this._latest
  return this.majors[major][0]
}

Versions.prototype.latestLTS = (version) => {
  let major
  if (!version) major = this._latestLTS
  else major = semver.major(version)
  if (!this.lts[major]) major = this._latestLTS
  return this.lts[major][0]
}

module.exports = index => new Versions(index)
