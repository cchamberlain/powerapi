import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Well } from 'react-bootstrap'

import AuthorizedPanel from './base/AuthorizedPanel'

import APIError from 'app/errors/APIError'

import NoShim from 'elements/filters/NoShim'
import MonikerTypeahead, { monikerShape } from 'elements/typeaheads/MonikerTypeahead'

import contextTypes from 'app/context'

import  { impersonateIdentity } from 'state/actions/identity'

import  { updateInputValue
        , clearSuggestions
        , loadSuggestions
        } from 'state/actions/autocomplete'

import OrganizationVisual from 'elements/visual/OrganizationVisual'
import UserVisual, { userShape } from 'elements/visual/UserVisual'

const boldStyle = { fontFamily: 'Lato', fontWeight: 700 }
const normalStyle = { fontFamily: 'Lato', fontWeight: 400 }
const boldButtonStyle = { fontWeight: 'bold', minWidth: 65 }
const linkStyle = { cursor: 'pointer' }
const noMarginTopStyle = { marginTop: 0 }
const marginBottomStyle = pixels => { marginBottom: pixels }
const paddingBottomStyle = pixels => { paddingBottom: pixels }



const identityShape = PropTypes.shape({ organization: monikerShape.isRequired
                                      , actualOrganization: monikerShape.isRequired
                                      , user: userShape.isRequired
                                      , actualUser: userShape.isRequired
                                      })

const monikerSuggestionsKey = ['organizations', 'monikers']

class AdminPanel extends Component {
  static propTypes =  { identity: identityShape.isRequired
                      , autocomplete: PropTypes.object.isRequired
                      , onRefresh: PropTypes.func
                      , isLoading: PropTypes.bool.isRequired
                      };
  static contextTypes = contextTypes;
  render() {

    const { dispatch
          , identity
          , autocomplete
          , onRefresh
          , isLoading
          } = this.props
    const { user
          , actualUser
          , organization
          , actualOrganization
          } = identity

    const onImpersonateAttempt = ({ organization, user }) => dispatch(impersonateIdentity({ organizationId: organization.id }))

    const isImpersonating = organization.id !== actualOrganization.id

    const padStyle = { paddingTop: 15, paddingBottom: 15 }

    return (
      <AuthorizedPanel
          title="Admin"
          iconName="user-secret"
          iconLoadingName="cog"
          accent="violet"
          isLoading={isLoading}>

        <Row >
          <Col xs={12}>
            <label className="sr-only" htmlFor="organizationInput">Organization</label>
            <MonikerTypeahead
              id="organization-typeahead"
              value={autocomplete.value}
              isLoading={autocomplete.isLoading}
              isFetching={isLoading}
              showOverlay={isImpersonating}
              overlayText="impersonating"
              overlayClicked={() => onImpersonateAttempt({ organization: actualOrganization })}
              updateInputValue = {value => dispatch(updateInputValue(monikerSuggestionsKey, value))}
              clearSuggestions={() => dispatch(clearSuggestions(monikerSuggestionsKey))}
              loadSuggestions={value => {
                dispatch(loadSuggestions(monikerSuggestionsKey, value))
              }}
              title="Impersonate"
              suggestions={autocomplete.suggestions || []}
              onSelected={organization => onImpersonateAttempt({ organization })}
              selectedMoniker={organization}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} style={padStyle}>
            <OrganizationVisual
                title="Organization"
                organization={organization}
                actualOrganization={actualOrganization}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} style={padStyle}>
            <UserVisual
                title="User"
                user={user}
                actualUser={actualUser}
            />
          </Col>
        </Row>

        {this.props.onRefresh ? (
          <Row>
            <Col xs={12}>
              <button className="btn btn-info" onClick={this.props.onRefresh}>Refresh Identity</button>
            </Col>
          </Row>
        ) : null}
      </AuthorizedPanel>
    )

  }
}


function mapStateToProps(state, ownProps) {
  const { identity, autocomplete } = state
  return  { identity
          , autocomplete
          , ...ownProps
          }
}

export default connect(mapStateToProps)(AdminPanel)
