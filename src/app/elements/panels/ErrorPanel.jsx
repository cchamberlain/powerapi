import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import contextTypes from 'app/context'
import CorePanel from './base/CorePanel'
import ErrorVisual from 'elements/diagnostics/ErrorVisual'

import { dismissError } from 'state/actions/api'

class ErrorPanel extends Component {
  render() {
    const { dispatch, errors, isLoading } = this.props
    const categories = Object.keys(errors)
    return (
      <CorePanel
          title="Errors"
          iconName="exclamation-circle"
          iconLoadingName="cog"
          accent="red"
          isLoading={isLoading}>
        {categories.map((category, i) => {
          const errorMap = errors[category]
          if(errorMap && errorMap.toArray) {
            return errorMap.toArray().map((err, i) => {
              return  <ErrorVisual
                          key={i}
                          error={err}
                          onDismiss={() => dispatch(dismissError(i, category))}
                      />
            })
          }
        })}
      </CorePanel>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { api, autocomplete, identity, validation, visual } = state
  return  { errors: { api: api.errors
                    , autocomplete: autocomplete.errors
                    , identity: identity.errors
                    , validation: validation.errors
                    , visual: visual.errors
                    }
          , ...ownProps
          }
}

export default connect(mapStateToProps)(ErrorPanel)
