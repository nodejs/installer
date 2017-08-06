import React from 'react'
import { any, bool, func } from 'prop-types'

export class InstallingOverlay extends React.Component {
  static propTypes = {
    installing: bool.isRequired,
    error: any,
    onCancel: func.isRequired
  }

  render () {
    if (!this.props.installing && !this.props.error) {
      return null
    }
    return (
      <div className='row installing'>
        <div className='col-xs-12'>
          <h1 className='color-green'>Installing Node.js</h1>
        </div>
        {
          this.props.installing
          ? (
            <div className='col-xs-12'>
              <div className='sk-folding-cube'>
                <div className='sk-cube1 sk-cube' />
                <div className='sk-cube2 sk-cube' />
                <div className='sk-cube4 sk-cube' />
                <div className='sk-cube3 sk-cube' />
              </div>
            </div>
          )
          : null
        }
        <div className='col-xs-offset-3 col-xs-6 error-message'>
          {
            this.props.error
            ? <p className='color-red error-text'>{this.props.error.message}</p>
            : null
          }
          <a href='#' className='color-red error-button' onClick={this.props.onCancel}>
            {
              this.props.installing
              ? 'Cancel Install'
              : 'Return to installer'
            }
          </a>
        </div>
      </div>
    )
  }
}
