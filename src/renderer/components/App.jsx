import React from 'react'

import { InstallingOverlay } from './InstallingOverlay'
import { LeftPanel } from './LeftPanel'
import { RightPanel } from './RightPanel'

import { Installer } from '../lib/Installer'
import getInstalledVersion from '../lib/check-node'
import getVersions from '../lib/versions'

const INSTALL_STATUS = {
  NOT_INSTALLING: 0,
  INSTALLING: 1,
  SUCCESS: 2,
  ERROR: 3
}

export class App extends React.Component {
  state = {
    installStatus: INSTALL_STATUS.NOT_INSTALLING,
    installError: null,
    versions: null,
    currentVersion: null
  }

  componentDidMount () {
    this.loadVersionList()
    getInstalledVersion((err, version) => {
      if (!err) {
        this.setState({
          currentVersion: version
        })
      }
    })
  }

  cancelInstall = () => {
    if (this._currentInstalller) {
      this._currentInstalller.cancel()
    }
    this.setState({
      installStatus: INSTALL_STATUS.NOT_INSTALLING,
      installError: null
    })
  }

  installVersion = (version) => {
    this.setState({
      installStatus: INSTALL_STATUS.INSTALLING
    })
    const installer = new Installer(version)
    this._currentInstalller = installer
    installer.on('error', (err) => {
      console.error(err)
      this.setState({
        installStatus: INSTALL_STATUS.ERROR,
        installError: err
      })
    })
    installer.on('done', () => {
      this.setState({
        currentVersion: version,
        installStatus: INSTALL_STATUS.SUCCESS
      })
      delete this._currentInstalller
    })
    installer.install()
  }

  loadVersionList () {
    window.fetch('https://nodejs.org/dist/index.json')
      .then(r => r.json())
      .then(getVersions)
      .then((versions) => {
        this.setState({
          versions
        })
      })
  }

  render () {
    return (
      <div id='main'>
        <InstallingOverlay
          installing={this.state.installStatus === INSTALL_STATUS.INSTALLING}
          error={this.state.installError}
          onCancel={this.cancelInstall}
        />
        <LeftPanel
          versions={this.state.versions}
          currentVersion={this.state.currentVersion}
          installVersion={this.installVersion}
        />
        <RightPanel />
      </div>
    )
  }
}
