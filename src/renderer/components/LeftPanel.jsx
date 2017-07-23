import { shell } from 'electron'
import { any, func, string } from 'prop-types'
import React from 'react'
import semver from 'semver'

import { InstalledNodeVersion } from './InstalledNodeVersion'
import { NodeLogo } from './images/NodeLogo'
import { NodeWhiteIcon, SpinnerIcon } from './icons'

export class LeftPanel extends React.Component {
  static propTypes = {
    currentVersion: string,
    versions: any,
    installVersion: func.isRequired
  }

  hasUpdate () {
    if (!this.props.currentVersion) return false
    if (!this.props.versions) return false
    return semver.gt(this.props.versions.latest.version, this.props.currentVersion)
  }

  installLatest = () => {
    if (!this.props.versions) return
    this.props.installVersion(this.props.versions.latest.version)
  }

  installLatestLTS = () => {
    if (!this.props.versions) return
    this.props.installVersion(this.props.versions.latestLTS.version)
  }

  launchNodeWebsite (event) {
    shell.openExternal('https://nodejs.org/en/')
    event.preventDefault()
  }

  render () {
    const loadingVersionList = !this.props.versions
    return (
      <div className='left-panel background-green'>
        <div className='row'>
          <div className='col-xs-12 node-image-container'>
            <NodeLogo onClick={this.launchNodeWebsite} />
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <p className='installed-version'>
              Installed version: <InstalledNodeVersion /></p>
          </div>
          {
            this.hasUpdate()
            ? (
              <div className='col-xs-12'>
                <a href='#' id='update-to' className='version-button' onClick={this.installLatestLTS}>
                  <NodeWhiteIcon />
                  Update to: <span>{this.props.versions.latest.version}</span>
                </a>
              </div>
            )
            : null
          }
        </div>
        <div className='spacer' />
        <div className='row'>
          <div className='col-xs-12'>
            <p>Latest versions:</p>
          </div>
          <div className='col-xs-12'>
            <a href='#' className='version-button' onClick={this.installLatestLTS}>
              <NodeWhiteIcon />
              Install stable: <span>{loadingVersionList ? <SpinnerIcon /> : this.props.versions.latestLTS.version}</span>
            </a>
          </div>
          <div className='col-xs-12'>
            <a href='#' className='version-button' onClick={this.installLatest}>
              <NodeWhiteIcon />
              Install current: <span>{loadingVersionList ? <SpinnerIcon /> : this.props.versions.latest.version}</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
