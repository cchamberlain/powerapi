import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Well, Row, Col } from 'react-bootstrap'
import classNames from 'classnames'
import bindAll from 'lodash.bindall'
import 'app/fonts/Lato-Regular.ttf'
import 'app/fonts/Lato-Bold.ttf'
import PasswordResetForm from 'elements/forms/PasswordResetForm'
import PasswordUpdateForm from 'elements/forms/PasswordUpdateForm'

import { apiAction, clearData } from 'state/actions/api'
import { toggleVisibility, setVisibility } from 'state/actions/visual'
import { setValidated } from 'state/actions/validation'

import { goToCleanUrl } from 'app/services/location'

import queryString from 'query-string'

import { client } from 'config'

import AuthorizedPanel from './base/AuthorizedPanel'
import CorePanel from './base/CorePanel'

const noop = () => {}

const boldStyle = { fontFamily: 'Lato', fontWeight: 700 }
const normalStyle = { fontFamily: 'Lato', fontWeight: 400 }
const boldButtonStyle = { fontWeight: 'bold', minWidth: 65 }
const linkStyle = { cursor: 'pointer' }
const noMarginTopStyle = { marginTop: 0 }


const getInputValue = input => input && input.value ? input.value : noop()
const inputHasValue = input => input && input.value && input.value.length > 0

let message = ''

const MaintenanceForm = props => {
  const { dispatch, api, validation, formType, onShowLogin, resetCode } = props
  const { validated } = validation

  switch(formType) {
    case 'reset':
      return  <PasswordResetForm
                  onShowLogin={onShowLogin}
                  onSubmit={({ username, email }) => {
                    return dispatch(apiAction(['users', 'passwordReset'], { userId: username || '', emailAddress: email || '' }))
                      .catch(err => console.error(err))
                  }}
                  message={api.entities.getIn(['users', 'passwordReset'], '')}
                  isUsernameDisabled={false}
                  isEmailDisabled={false}
                  recaptchaSiteKey={client.recaptcha.publicKey}
                  recaptchaOnValidated={() => dispatch(setValidated('recaptcha'))}
                  recaptchaIsValid={validated.get('recaptcha')}
              />
    case 'update':
    case 'migrate':
      return  <PasswordUpdateForm
                  isMigrate={formType === 'migrate'}
                  onSubmit={({ password })=> {
                    dispatch(apiAction(['users', 'passwordUpdate'], { password, resetCode }))
                      .then(data => console.dir(data))
                      .catch(err => console.error(err))
                  }}
                  message={api.entities.getIn(['users', 'passwordUpdate'], '')}
                  onShowLogin={onShowLogin}
              />
    default:
      throw new Error(`Unknown form type => ${formType}`)
  }
}

const titleMap = new Map( [ ['reset', 'Password Reset Request']
                          , ['update', 'Update Password']
                          , ['migrate', 'Update Password']
                          ])


const pwresetParam = () => {
  let qs = queryString.parse(window.location.search)
  return  { update: qs.pwreset || noop()
          , migrate: qs.case || noop()
          }
}

export const isResetRequest = () => {
  const { update, migrate } = pwresetParam()
  return update || migrate
}


class MaintenancePanel extends Component {
  //static methods = ['renderRecaptcha',  'renderUpdatePasswordMessage', 'renderMessage', 'renderError'];
  static propTypes =  { //, onResetRequest: PropTypes.func.isRequired
                      //, onUpdateRequest: PropTypes.func.isRequired
                      //, successMessage: PropTypes.string
                      //, message: PropTypes.string
                      //, pwreset: PropTypes.string
                      };
  constructor(props) {
    super(props)
  }
  render() {
    const { dispatch, visual, api } = this.props
    const isLoading = api.isFetching.getIn(['users', 'passwordReset']) || api.isFetching.getIn(['users', 'passwordUpdate'])
    const pwreset = pwresetParam()


    let formType = visual.visibility.get('maintenance_reset-update-migrate')
    if(pwreset.update)
      formType = 'update'
    if (pwreset.migrate)
      formType = 'migrate'

    const handleShowLogin = () => {
      dispatch(clearData(['users', 'passwordReset']))
      dispatch(clearData(['users', 'passwordUpdate']))
      dispatch(setVisibility('login-reset', 'login'))
      goToCleanUrl()
    }
    return (
      <CorePanel
          title={titleMap.get(formType)}
          iconName="user"
          iconLoadingName="cog"
          isLoading={isLoading}>
        <MaintenanceForm {...this.props}
            formType={formType}
            onShowLogin={handleShowLogin}
            resetCode={pwreset.update}
        />

      </CorePanel>
    )
  }
}

/*
    this.state =  { inputResetUsername: ''
                  , inputResetEmail: ''
                  , inputUpdatePassword: ''
                  , inputUpdatePasswordConfirm: ''
                  , recaptchaValidated: false
                  }
                  */
                  /*
    this.getTextState = name => {
      let stateValue = this.state[name]
      return stateValue && stateValue.length > 0 ? stateValue : noop()
    }
    this.hasTextState = name => typeof this.getTextState(name) !== 'undefined'
    this.onResetRequest = e => {
      let username = this.getTextState('inputResetUsername')
      let email = this.getTextState('inputResetEmail')
      this.props.onResetRequest({ username, email })
      e.preventDefault()
    }
    this.onUpdateRequest = e => {
      if(typeof this.props.pwreset === 'undefined')
        throw new Error('Must specify pwreset code in order to send update password request.')
      let password = this.getTextState('inputUpdatePassword')
      let passwordConfirm = this.getTextState('inputUpdatePasswordConfirm')
      if(password !== passwordConfirm)
        throw new Error('Password and password confirm must match.')
      this.setState({ inputUpdatePassword: '', inputUpdatePasswordConfirm: '' })
      this.props.onUpdateRequest({ password, resetCode: this.props.pwreset })
      e.preventDefault()
    }
    this.validatePasswordUpdate = () => {
      let password = this.getTextState('inputUpdatePassword')
      let passwordConfirm = this.getTextState('inputUpdatePasswordConfirm')
      return password && passwordConfirm && password === passwordConfirm
    }
    */

function mapStateToProps(state, ownProps) {
  const { identity, api, visual, validation } = state
  return  { identity
          , api
          , visual
          , validation
          , ...ownProps
          }
}

export default connect(mapStateToProps)(MaintenancePanel)
