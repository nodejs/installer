import semver from 'semver'

function forceSort (dict) {
  function sorter (v1, v2) {
    const one = (semver.minor(v1) * 1000) + semver.patch(v1)
    const two = (semver.minor(v2) * 1000) + semver.patch(v2)
    return one - two
  }

  const keys = Object.keys(dict).sort(sorter).reverse()
  return keys.map((k) => dict[k])
}

class Versions {
  constructor (raw) {
    this.raw = raw
    this.majors = {}
    this.lts = {}
    this.load()
  }

  load () {
    const raw = this.raw
    for (const version of raw) {
      const major = semver.major(version.version)

      if (!this.majors[major]) this.majors[major] = {}
      this.majors[major][version.version] = version
      if (version.lts) {
        if (!this.lts[major]) this.lts[major] = {}
        this.lts[major][version.version] = version
      }
    }

    this._latest = 0
    for (const majorN in this.majors) {
      this.majors[majorN] = forceSort(this.majors[majorN])
      if (parseInt(majorN, 10) > this._latest) this._latest = parseInt(majorN, 10)
    }
    this._latestLTS = 0
    for (let k in this.lts) {
      this.lts[k] = forceSort(this.lts[k])
      if (parseInt(k) > this._latestLTS) this._latestLTS = parseInt(k)
    }
  }

  get latest () {
    return this.majors[this._latest][0]
  }

  get latestLTS () {
    return this.lts[this._latestLTS][0]
  }
}

module.exports = raw => new Versions(raw)
