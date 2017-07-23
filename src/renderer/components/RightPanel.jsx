import { shell } from 'electron'
import React from 'react'

import { RandomExample } from './RandomExample'
import { NodeSchoolLogo } from './images/NodeSchoolLogo'

export class RightPanel extends React.Component {
  launchNodeSchoolWebsite (event) {
    shell.openExternal('https://nodeschool.io/')
    event.preventDefault()
  }

  render () {
    return (
      <div className='right-panel'>
        <div className='row'>
          <div className='col-xs-12 school-image-container'>
            <NodeSchoolLogo />
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <h3 className='title color-green'>Educational resources:</h3>
            <p className='text'>
              Open source workshops that teach web software skills.<br />
              Do them on your own or at a workshop nearby.<br />
              <a href='#' onClick={this.launchNodeSchoolWebsite}>https://nodeschool.io/</a>
            </p>
          </div>
        </div>
        <RandomExample />
      </div>
    )
  }
}
