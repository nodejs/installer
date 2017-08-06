import React from 'react'
import { PrismCode } from 'react-prism'

import getExample from '../lib/examples'

export class RandomExample extends React.Component {
  state = {
    example: null
  }

  componentDidMount () {
    getExample((err, example) => {
      // Not possible to get err currently
      if (err) return

      this.setState({
        example
      })
    })
  }

  render () {
    if (!this.state.example) {
      return null
    }
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <h4 id='code-title' className='title color-green'>{this.state.example.title}</h4>
          <pre>
            <PrismCode className='language-javascript'>
              {this.state.example.code}
            </PrismCode>
          </pre>
        </div>
      </div>
    )
  }
}
