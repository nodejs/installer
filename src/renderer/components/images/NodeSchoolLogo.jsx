import React from 'react'
import { func } from 'prop-types'
import path from 'path'

const logoPath = path.resolve(__dirname, '../../../../static/images/schoolhouse.svg')

export class NodeSchoolLogo extends React.Component {
  static propTypes = {
    onClick: func
  }

  render () {
    return <img src={logoPath} alt='node school logo' onClick={this.props.onClick} />
  }
}
