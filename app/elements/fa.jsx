import React from 'react'
import { Link } from 'react-router'

export class ListIconLink extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <li><IconLink {...this.props} /></li>
  }
}

export class IconLink extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<Link to={this.props.to}>
        <Icon icon={this.props.icon} size={this.props.size} />
        {` ${this.props.title}`}
      </Link>)
  }
}

export class Icon extends React.Component {
  constructor(props) {
    super(props)
  }
  getClass = () => {
    let icon = `fa fa-${this.props.icon}`
    if(this.props.icon.size)
      icon += ` fa-${this.props.size}`
    if(this.props.icon.spin) {
      icon += ' fa-spin'
    }
    return icon
  }
  getSize = () => this.props.size ? `fa-${this.props.size}` : null
  render = () => <i className={this.getClass()} />
}
Icon.propTypes =  { icon: React.PropTypes.string.isRequired
                    , size: React.PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x'])
                    , spin: React.PropTypes.bool }
