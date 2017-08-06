import React from 'react'

import { ErrorIcon, SpinnerIcon } from './icons'

import getInstalledVersion from '../lib/check-node'

export class InstalledNodeVersion extends React.Component {
  state = {
    loading: true,
    error: false,
    version: null
  }

  componentDidMount () {
    getInstalledVersion((err, version) => {
      if (err) {
        this.setState({
          error: true,
          loading: false
        })
      } else {
        this.setState({
          loading: false,
          version
        })
      }
    })
  }

  render () {
    return (
      <span>
        {
          this.state.loading
          ? <SpinnerIcon />
          : (
            this.state.error
            ? <ErrorIcon />
            : this.state.version
          )
        }
      </span>
    )
  }
}
