import React from 'react'
import 'font-awesome-webpack'

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
