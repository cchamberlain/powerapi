import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Grid, Row, Col, Well } from 'react-bootstrap'
import Recaptcha from 'app/controls/Recaptcha'
import NoAutoComplete from './controls/NoAutoComplete'
import Input from './controls/Input'
import NoShim from 'elements/filters/NoShim'
import classNames from 'classnames'

const boldStyle = { fontFamily: 'Lato', fontWeight: 700 }
const normalStyle = { fontFamily: 'Lato', fontWeight: 400 }
const boldButtonStyle = { fontWeight: 'bold', minWidth: 65 }
const linkStyle = { cursor: 'pointer' }
const alertStyle = { padding:8, borderRadius: 5, marginTop:4 }


const RecaptchaShim = props => (
  <NoShim>
    <Row style={{ marginBottom: 10, display: props.isValidated ? 'none' : 'block' }}>
      <Col xs={12}>
        <div className="pull-right">
          <Recaptcha
            siteKey={props.siteKey}
            onloadCallbackName="recaptchaOnLoad"
            onValidate={props.onValidated}
          />
        </div>
      </Col>
    </Row>
  </NoShim>
)

const BackToLogin = props => (
  <a onClick={props.onShowLogin} style={linkStyle}>Go back to login</a>
)

const GenericMessage = props => (
  props.message ? (
  <div  className={classNames('alert', 'alert-sm', { 'alert-success' : props.message.includes('success'), 'alert-info': !props.message.includes('success')})}
        style={{ ...alertStyle, ...boldStyle }}
        role="alert">
    {props.message}
  </div>
  ) : <span className="no-message" />
)

const ErrorMessage = props => (
  props.message ? (
    <div style={{color:'maroon'}} role="alert">
      <span>{props.message}</span>
    </div>
  ) : <span className="no-error" />
)


const handleValidate = values => {
  const errors = {}
  if (values.username && values.email) {
    errors.username = 'Must enter username or email but not both.'
    errors.password= 'Must enter username or email but not both.'
  } else if (!values.username && !values.email) {
    errors.username = 'Must enter username or email.'
    errors.password= 'Must enter username or email.'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
}

class PasswordResetForm extends Component {
  static propTypes =  { fields: PropTypes.object.isRequired
                      , handleSubmit: PropTypes.func.isRequired
                      , submitting: PropTypes.bool.isRequired
                      , recaptchaSiteKey: PropTypes.string.isRequired
                      , recaptchaOnValidated: PropTypes.func.isRequired
                      , recaptchaIsValid: PropTypes.bool.isRequired
                      , onShowLogin: PropTypes.func.isRequired
                      };
  render() {
    const { fields: { username, email }
          , resetForm
          , handleSubmit
          , submitting

          , recaptchaSiteKey
          , recaptchaOnValidated
          , recaptchaIsValid

          , onShowLogin

          , showPasswordReset
          , message
          , emailError
          , isUsernameDisabled
          , isEmailDisabled
          } = this.props



    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12}>
            <span style={normalStyle}>Please choose ONE of the following password reset methods:</span>
          </Col>
        </Row>


        <div className="form-group p-top-10">
          <span style={boldStyle}>By Username</span>
          <Input
            type="text"
            className="form-control"
            maxLength="30"
            placeholder="Username / ID"
            disabled={email.value}
            {...username}
          />
        </div>
        <div className="form-group">
          <span style={boldStyle}>By Email</span>
          <Input
            type="email"
            className="form-control"
            maxLength="30"
            placeholder="Email"
            disabled={username.value}
            {...email}
          />
          <ErrorMessage message={emailError} />
        </div>

        <RecaptchaShim siteKey={recaptchaSiteKey} onValidated={recaptchaOnValidated} />

        <Row>
          <Col xs={8} pullLeft style={{...boldStyle, marginTop: 9 }}>
            <BackToLogin onShowLogin={onShowLogin} />
          </Col>
          <Col xs={4} pullRight>
            <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-default btn-stretch pull-right"
                style={boldButtonStyle}
                disabled={(!username.value && !email.value) || !recaptchaIsValid}>
              Reset
            </button>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <GenericMessage message={message} />
          </Col>
        </Row>
      </form>
    )
  }
}


export default reduxForm( { form: 'password-reset'
                          , fields: ['username', 'email']
                          //, validate: handleValidate
                          })(PasswordResetForm)
