var semver = require('semver')

function forceSort (dict) {
  function sorter (v1, v2) {
    var one = (semver.minor(v1) * 1000) + semver.patch(v1)
    var two = (semver.minor(v2) * 1000) + semver.patch(v2)
    return one - two
  }

  var keys = Object.keys(dict).sort(sorter).reverse()
  return keys.map((k) => dict[k])
}

function Versions (index) {
  this.index = index
  this.majors = {}
  this.lts = {}
  this.load()
}
Versions.prototype.load = function () {
  var index = this.index
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
  for (k in this.majors) {
    this.majors[k] = forceSort(this.majors[k])
    if (parseInt(k) > this._latest) this._latest = parseInt(k)
  }
  this._latestLTS = 0
  for (k in this.lts) {
    this.lts[k] = forceSort(this.lts[k])
    if (parseInt(k) > this._latestLTS) this._latestLTS = parseInt(k)
  }
}
Versions.prototype.latest = function (version) {
  if (!version) major = this._latest
  else major = semver.major(version)
  return this.majors[major][0]
}
Versions.prototype.latestLTS = function (version) {
  if (!version) major = this._latestLTS
  else major = semver.major(version)
  return this.lts[major][0]
}

module.exports = index => new Versions(index)