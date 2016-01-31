import React, { Component, PropTypes } from 'react'
import bindAll from 'lodash.bindall'
import contextTypes from 'app/context'

function noop() {}

class Input extends Component {
  static propTypes =  { type: PropTypes.oneOf(['text', 'password', 'email', 'button', 'submit']).isRequired
                      , value: PropTypes.string.isRequired
                      , placeholder: PropTypes.string
                      , alt: PropTypes.string
                      , autoComplete: PropTypes.bool
                      , autoFocus: PropTypes.bool
                      , checked: PropTypes.bool
                      , disabled: PropTypes.bool
                      , maxLength: PropTypes.any
                      , min: PropTypes.any
                      , name: PropTypes.string
                      , readOnly: PropTypes.bool
                      , required: PropTypes.bool
                      , size: PropTypes.number
                      , onChange: PropTypes.func
                      };
  static defaultProps = { value: ''
                        };
  static contextTypes = contextTypes;
  render() {
    const { style } = this.context.theme
    return <input style={style.input} {...this.props} ref={x => this.input=x} />
  }
}


export default Input
