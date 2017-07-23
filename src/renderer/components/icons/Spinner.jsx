import React from 'react'
import FontAwesome from 'react-fontawesome'

export class Spinner extends React.Component {
  render () {
    return <FontAwesome name='spinner' pulse spin fixedWidth />
  }
}
