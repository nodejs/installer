import React from 'react'
import path from 'path'

const logoPath = path.resolve(__dirname, '../../../../static/images/lgoonodejswhite.png')

export class NodeWhite extends React.Component {
  render () {
    return <img className='node-white-icon' src={logoPath} alt='' />
  }
}
