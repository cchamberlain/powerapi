import React, { Component, PropTypes } from 'react'
import IdleTimer from 'react-idle-timer-babel6'
import { createLogger } from 'bunyan'
import bindAll from 'lodash.bindall'
import swal from 'sweetalert'

import './Timeout.less'
import Hatch from 'controls/Hatch'

const logger = createLogger({ name: 'Timeout', level: 'debug' })

export const idleStateMap = new Map([[0, 'active'], [1, 'inactive'], [2, 'expired']])
export const idleStateBSStyleMap = new Map([['active', 'success'], ['inactive', 'warning'], ['expired', 'danger']])

export const getIdleState = idleStateIndex => {
  return { idleState: idleStateMap.get(idleStateIndex), idleStateIndex }
}
export const getNextIdleState = idleStateIndex => {
  let nextOrdinal = idleStateIndex + 1
  return nextOrdinal >= idleStateMap.size ? null  : getIdleState(nextOrdinal)
}


export default class Timeout extends Component {
  static methods = ['getNextIdleState', 'renderInner', 'onLoginAttempt', 'onLoginFailure', 'onActive', 'onInactive', 'onExpired'];

  constructor(props) {
    super(props)
    bindAll(this, Timeout.methods)

    this.isComponentMounted = false
    //this.state = { ...getIdleState(0), errors: [] }
  }
  componentDidMount() {
    this.isComponentMounted = true
  }
  componentWillUnmount() {
    this.isComponentMounted = false
  }
  getNextIdleState() {
    return getNextIdleState(this.props.idleStateIndex)
  }
  render() {
    return (
        <IdleTimer  ref={x => this.expireTimer=x}
                    idleAction={this.onExpired}
                    timeout={this.props.expireMS}
                    format="MM-DD-YYYY HH:MM:ss.SSS">
          {this.renderInner()}
        </IdleTimer>
      )
  }
  renderInner() {
    if(!__SHIM__) {
      return (
        <IdleTimer  activeAction={this.onActive}
                    idleAction={this.onInactive}
                    timeout={this.props.inactiveMS}
                    format="MM-DD-YYYY HH:MM:ss.SSS">
          <Hatch  isClosed={this.props.idleState === 'expired'}
                  onLoginAttempt={this.onLoginAttempt}
                  hasAuthorization={true}
                  authorizationType="password"
                  username={this.props.username}
                  title="Session Expired!"
                  message="You have been logged out due to inactivity."
                  errors={this.props.errors} >
            {this.props.children}
          </Hatch>
        </IdleTimer>
      )
    }
  }
  onLoginAttempt(credentials) {
    if(this.isComponentMounted) {
      logger.debug('onLoginAttempt')
      this.props.onLoginAttempt(credentials)
    }
  }
  onLoginFailure() {
    if(this.isComponentMounted) {
      logger.debug(`onLoginFailure: ${err}`)
    }
  }
  onActive() {
    if(this.isComponentMounted) {
      swal.close()
      if(this.props.idleState !== 'expired')
        this.props.onActive()
    }
  }
  onInactive() {
    if(this.isComponentMounted) {
      swal( { title: 'Still There?'
            , text: 'You will be logged out due to inactivity shortly.'
            , animation: 'slide-from-top'
            , showConfirmButton: false
            , html: true
            , type: 'warning'
            })
      this.props.onInactive()
    }
  }
  onExpired() {
    if(this.isComponentMounted) {
      if(__SHIM__) {
        window.location.replace('/management')
      } else {
        this.props.onExpired()
      }
      setTimeout(() => this.props.forgetTokens(), 2000)
    }
  }
}

Timeout.propTypes = { inactiveMS: PropTypes.number
                    , expireMS: PropTypes.number
                    , tickMS: PropTypes.number
                    , visible: PropTypes.bool
                    , autoRefreshIdentity: PropTypes.bool
                    , onLoginAttempt: PropTypes.func.isRequired
                    , idleState: PropTypes.string.isRequired
                    , idleStateIndex: PropTypes.number.isRequired
                    , errors: PropTypes.array.isRequired
                    , forgetTokens: PropTypes.func.isRequired
                    , onActive: PropTypes.func.isRequired
                    , onInactive: PropTypes.func.isRequired
                    , onExpired: PropTypes.func.isRequired
                    , username: PropTypes.string
                    }
Timeout.defaultProps =  { tickMS: 1000
                        , autoRefreshIdentity: true
                        }

