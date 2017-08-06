import React from 'react'
import { func } from 'prop-types'
import path from 'path'

const logoPath = path.resolve(__dirname, '../../../../static/images/nodejs-new-white-bw.png')

export class NodeLogo extends React.Component {
  static propTypes = {
    onClick: func
  }

  render () {
    return <img className='node-logo' src={logoPath} alt='node logo' onClick={this.props.onClick} />
  }
}
