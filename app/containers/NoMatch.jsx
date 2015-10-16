import React from 'react'

export default class NoMatch extends React.Component {
  static getProps() {
    return {};
  }
  render() {
    return <div>
      <h2>Not found</h2>
      <p>The page you requested was not found.</p>
    </div>
  }
}
