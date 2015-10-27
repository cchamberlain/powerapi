import React from 'react'
import { Link } from 'react-router'
import 'font-awesome-webpack'

export class ListFALink extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <li><FALink {...this.props} /></li>
  }
}

export class FALink extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<Link to={this.props.to}>
        <FAIcon icon={this.props.icon} size={this.props.size} />
        {` ${this.props.title}`}
      </Link>)
  }

}

export class FAIcon extends React.Component {
  constructor(props) {
    super(props)
  }
  getFAClass = () => {
    let icon = this.getFAIcon()
    let size = this.getFASize()
    return  size ? `fa ${icon} ${size}` : `fa ${icon}`
  }
  getFAIcon = () => `fa-${this.props.icon}`
  getFASize = () => this.props.size ? `fa-${this.props.size}` : null
  render = () => <i className={this.getFAClass()} />
}
FAIcon.propTypes =  { icon: React.PropTypes.string.isRequired
                    , size: React.PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x'])}
