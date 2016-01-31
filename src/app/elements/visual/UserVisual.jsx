import React, { Component, PropTypes } from 'react'

export const userShape = PropTypes.shape( { username: PropTypes.string.isRequired
                                          , id: PropTypes.number.isRequired
                                          , fullName: PropTypes.string.isRequired
                                          , firstName: PropTypes.string
                                          , lastName: PropTypes.string
                                          , onError: PropTypes.func
                                          })

const noPadStyle = { marginTop: 20, paddingTop: 0, paddingBottom:0, marginBottom:0 }
const labelStyle = { width: '40%', float: 'left'  }
const inputStyle = { width: '60%', float: 'right', textAlign: 'right' }
const impersonatingStyle = { fontSize: '0.8em', color: 'rgb(100, 100, 100)', marginTop: 0, paddingTop: 0 }

const UserVisual = props => {
  return (
    <div>
      <label style={labelStyle}>{props.title} <i className="fa fa-long-arrow-right"></i></label>
      <p style={inputStyle}>{props.user.username} ({props.user.id})</p>
      {props.actualUser && props.actualUser.id !== props.user.id ? (
        <p style={inputStyle}>{props.actualUser.username} ({props.actualUser.id})</p>
      ) : null}
    </div>
  )
}
UserVisual.propTypes =  { user: userShape.isRequired
                        , actualUser: userShape
                        , title: PropTypes.string.isRequired
                        }

export default UserVisual
