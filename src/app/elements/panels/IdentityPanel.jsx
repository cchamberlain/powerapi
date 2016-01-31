import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Well } from 'react-bootstrap'
import bindAll from 'lodash.bindall'

import MaintenancePanel from 'elements/panels/MaintenancePanel'
import { createClientLogger, client } from 'config'
import contextTypes from 'app/context'

import AuthorizedPanel from './base/AuthorizedPanel'
import CorePanel from './base/CorePanel'

import LoginForm from 'elements/forms/LoginForm'

import  { authorizeIdentity
        , refreshIdentity
        , impersonateIdentity
        , hydrateTokens
        , forgetTokens
        , dismissIdentityError
        } from 'state/actions/identity'

import  { toggleVisibility
        , setVisibility
        } from 'state/actions/visual'

import 'app/fonts/Lato-Regular.ttf'
import 'app/fonts/Lato-Bold.ttf'

function noop() {}

const logger = createClientLogger('LoginForm')

const boldStyle = { fontFamily: 'Lato', fontWeight: 700 }
const normalStyle = { fontFamily: 'Lato', fontWeight: 400 }
const boldButtonStyle = { fontWeight: 'bold', minWidth: 65 }
const linkStyle = { cursor: 'pointer' }
const noMarginTopStyle = { marginTop: 0 }


const Authorized = props => {
  const { onSignout
        , username

        , isLoading
        , headerStyle
        , contentStyle
        } = props
  return (
    <AuthorizedPanel
        title="Authorized"
        iconName="lock"
        iconLoadingName="cog"
        isLoading={isLoading}
        headerStyle={headerStyle}
        contentStyle={contentStyle}>
      <Row>
        <Col xs={6}>
          <span style={boldStyle} className="pull-left m-top-10">You are signed in as {username}.</span>
        </Col>
        <Col xs={6}>
          <button
              onClick={onSignout}
              type="button"
              className="btn btn-danger m-top-5 pull-right">
            Log Out
          </button>
        </Col>
      </Row>
    </AuthorizedPanel>
  )
}

const Anonymous = props => {
  const { onLoginAttempt
        , passwordResetMessage
        , passwordResetSuccessMessage
        , onPasswordResetRequest
        , onPasswordUpdateRequest
        , pwreset
        , pwresetCaseSensitive
        , toggleLoginResetPanels
        , setPasswordResetFormType

        , isLoading
        , headerStyle
        , contentStyle
        } = props

  return (
    <CorePanel
        title="Login"
        iconName="unlock"
        iconLoadingName="cog"
        isLoading={isLoading}
        headerStyle={headerStyle}
        contentStyle={contentStyle}>

      <LoginForm
          onSubmit={onLoginAttempt}
          onForgotPasswordClick={toggleLoginResetPanels}
      />
    </CorePanel>
  )

/*
  return isLoginVisible ? (
      <LoginForm
        onSubmit={onLoginAttempt}
        showPasswordReset={toggleLoginResetPanels}
      />
    ) : (
      <MaintenancePanel
        message={passwordResetMessage}
        successMessage={passwordResetSuccessMessage}
        onResetRequest={onPasswordResetRequest}
        onUpdateRequest={onPasswordUpdateRequest}
        recaptchaSiteKey={recaptchaSiteKey}
        pwreset={pwresetCaseSensitive || pwreset}
        showLogin={toggleLoginResetPanels}
      />
    )
*/
}
Anonymous.propTypes = { onLoginAttempt: PropTypes.func.isRequired
                      //, passwordResetMessage: PropTypes.string.isRequired
                      //, passwordResetSuccessMessage: PropTypes.string.isRequired
                      //, onPasswordResetRequest: PropTypes.func.isRequired
                      //, onPasswordUpdateRequest: PropTypes.func.isRequired
                      //, pwreset: PropTypes.string.isRequired
                      //, pwresetCaseSensitive: PropTypes.bool.isRequired
                      , toggleLoginResetPanels: PropTypes.func.isRequired
                      }

class IdentityPanel extends Component {
  static propTypes =  { identity: PropTypes.object.isRequired
                      , layout: PropTypes.oneOf(['standard', 'compact']).isRequired
                      , pwresetCaseSensitive: PropTypes.string
                      };
  static defaultProps = { layout: 'standard'
                        };
  static contextTypes = contextTypes;
  constructor(props) {
    super(props)
    const { dispatch } = props

    this.onLoginAttempt = credentials => dispatch(authorizeIdentity(credentials))
    this.onSignout = () => dispatch(forgetTokens())
    this.onPasswordResetRequest = ({ username, email }) => {}
    this.onPasswordUpdateRequest = ({ password, resetCode }) => {}
  }

  render() {
    const { theme: { palette, color, style }, gridProps } = this.context
    const { dispatch, identity, api, visual } = this.props
    const { subject, isAuthorized } = identity
    const { visibility } = visual
    const isLoading = api.isFetching.getIn(['identity', 'authorize'], false)

    return isAuthorized ? (
      <Authorized
        onSignout={this.onSignout}
        username={subject}
      />
    ) : (
      <Anonymous
        isLoading={isLoading}
        onLoginAttempt={this.onLoginAttempt}
        toggleLoginResetPanels={() => dispatch(toggleVisibility('login-reset'))}
      />
    )
  }

  renderPasswordReset() {
    const { pwresetCaseSensitive } = this.props
    let formType = 'request' //typeof this.state.pwreset === 'undefined' ? 'request' : 'update'
    /*if(this.state.caseSensitive)
      formType = 'caseSensitiveUpdate'
    if(this.state.showPasswordReset) {
      return  (

      )
    }
    */
  }

  componentDidMount() {
    if(this.inputUsername)
      this.inputUsername.focus()
  }
}

function mapStateToProps(state, ownProps) {
  const { identity, api, visual } = state
  return  { identity
          , api
          , visual
          , ...ownProps
          }
}

export default connect(mapStateToProps)(IdentityPanel)
