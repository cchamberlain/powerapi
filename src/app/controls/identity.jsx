import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import bindAll from 'lodash.bindall'
import { cookieNames, flags } from 'config-client'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Label from 'elements/forms/controls/Label'
import contextTypes from 'app/context'
import { ThemeSelector } from 'elements/panels/ThemePanel'

class Identity extends Component {
  static propTypes =  { identity: PropTypes.object.isRequired
                      };
  static contextTypes = contextTypes;
  constructor(props) {
    super(props)
    bindAll(this, ['renderFingerprint', 'renderAccessToken', 'renderRefreshToken'])
  }
  render() {
    return <div>
      {this.renderFingerprint()}
      {' '}
      {this.renderAccessToken()}
      {' '}
      {this.renderRefreshToken()}
      {' '}
      <ThemeSelector />
    </div>
  }
  renderFingerprint() {
    if(__DEV__) {
      const { fingerprint } = this.props.identity
      let label = <Label>{fingerprint ? 'Fingerprint' : 'No Fingerprint'}</Label>
      if(fingerprint) {
        let tooltip = <Tooltip id="tooltip-fingerprint">{fingerprint}</Tooltip>
        return (<OverlayTrigger placement="top" overlay={tooltip}>
          {label}
        </OverlayTrigger>)
      }
      return label
    }
  }
  renderAccessToken() {
    if(__DEV__) {
      const { tokens } = this.props.identity
      let label = <Label>{tokens ? 'Access Token' : 'No Access Token'}</Label>
      if(tokens) {
        let tooltip = <Tooltip id="tooltip-access-token">{tokens.access}</Tooltip>
        return (<OverlayTrigger placement="top" overlay={tooltip}>
          {label}
        </OverlayTrigger>)
      }
      return label
    }
  }
  renderRefreshToken() {
    if(__DEV__) {
      const { tokens } = this.props.identity
      let label = <Label>{tokens ? 'Refresh Token' : 'No Refresh Token'}</Label>
      if(tokens) {
        let tooltip = <Tooltip id="tooltip-refresh-token">{tokens.refresh}</Tooltip>
        return (<OverlayTrigger placement="top" overlay={tooltip}>
          {label}
        </OverlayTrigger>)
      }
      return label
    }
  }
}

function mapStateToProps(state) {
  const { identity } = state
  return  { identity
          }
}

export default connect(mapStateToProps)(Identity)
