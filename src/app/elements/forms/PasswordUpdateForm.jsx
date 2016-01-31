import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Grid, Row, Col, Well } from 'react-bootstrap'
import NoAutoComplete from './controls/NoAutoComplete'
import Input from './controls/Input'
import classNames from 'classnames'

const boldStyle = { fontFamily: 'Lato', fontWeight: 700 }
const normalStyle = { fontFamily: 'Lato', fontWeight: 400 }
const boldButtonStyle = { fontWeight: 'bold', minWidth: 65 }
const linkStyle = { cursor: 'pointer' }
const alertStyle = { padding:8, borderRadius: 5, marginTop:4 }

const isValid = (password, passwordConfirm) => password.value && password.value.length > 0 && password.value === passwordConfirm.value



let containerStyle = { textAlign: 'center', height: 60, float: 'right', marginTop:10}
let imageStyle = { height: 50, float:'left' }
let spanStyle = { marginTop: 15, maxWidth:300 }


const UpdatePasswordMessage = props => (
  props.isMigrate? (
    <div style={containerStyle}>
      <img src="/img/construction.png" style={imageStyle} />
      <span style={spanStyle}>Pardon the dust. Our recent changes to the login system require you to update your password.</span>
    </div>
  ) : (
    <span style={normalStyle}>Please enter your desired password below:</span>
  )
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

class PasswordUpdateForm extends Component {
  static propTypes =  { fields: PropTypes.object.isRequired
                      , handleSubmit: PropTypes.func.isRequired
                      , submitting: PropTypes.bool.isRequired
                      , isMigrate: PropTypes.bool
                      };
  render() {
    const { fields: { password, passwordConfirm }, resetForm, handleSubmit, submitting, validate
          , isMigrate
          , message
          , onShowLogin
          } = this.props

    const postSubmitStyle = { display: message ? 'none' : 'block' }
    return (
      <form onSubmit={handleSubmit}>
        <NoAutoComplete />
        <Row style={postSubmitStyle}>
          <Col xs={12} pullLeft style={{...boldStyle, marginTop: 9 }}>
            <UpdatePasswordMessage isMigrate={isMigrate} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} pullLeft style={{...boldStyle, marginTop: 9 }}>
            <div style={postSubmitStyle}>
              <div className="form-group p-top-10">
                <span style={boldStyle}>New Password</span>
                <Input
                    type="password"
                    className="form-control"
                    maxLength="30"
                    placeholder="Password"
                    {...password}
                />
              </div>

              <div className="form-group" style={{display: password.value && password.value.length > 0 ? 'block' : 'none'}}>
                <span style={boldStyle}>Confirm Password</span>
                <Input
                    type="password"
                    className="form-control"
                    maxLength="30"
                    placeholder="Confirm Password"
                    {...passwordConfirm}
                />
              </div>
            </div>

              <Row>
                <Col xs={8} pullLeft style={{...boldStyle, marginTop: 9 }}>
                  <BackToLogin onShowLogin={onShowLogin} />
                </Col>
                <Col xs={4} pullRight style={postSubmitStyle}>
                  <button
                      onClick={handleSubmit}
                      className="btn btn-default btn-stretch pull-right"
                      disabled={!isValid(password, passwordConfirm)}
                      style={boldButtonStyle}>
                    Update
                  </button>
                </Col>
              </Row>
            <Row>
              <Col xs={12} style={boldStyle}>
                <ErrorMessage message={password.value && password.value.length > 0 && !isValid(password, passwordConfirm) ? 'Passwords do not match.' : null} />
                <GenericMessage message={message} />
              </Col>
            </Row>
          </Col>
        </Row>
      </form>
    )
  }
}

export default reduxForm( { form: 'password-update'
                          , fields: ['password', 'passwordConfirm']
                          })(PasswordUpdateForm)
