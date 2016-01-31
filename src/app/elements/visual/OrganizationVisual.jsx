import React, { Component, PropTypes } from 'react'
import { monikerShape } from 'elements/typeaheads/MonikerTypeahead'

const noPadStyle = { marginTop: 20, paddingTop: 0, paddingBottom:0, marginBottom:0 }
const labelStyle = { width: '40%', float: 'left'  }
const inputStyle = { width: '60%', float: 'right', textAlign: 'right' }
const impersonatingStyle = { fontSize: '0.8em', color: 'rgb(100, 100, 100)', marginTop: 0, paddingTop: 0 }
const OrganizationVisual = props => {
  return (
    <div>
      <label style={labelStyle}>{props.title} <i className="fa fa-long-arrow-right"></i></label>
      <p style={inputStyle}>{props.organization.name} ({props.organization.id})</p>
      {props.actualOrganization && props.actualOrganization.id !== props.organization.id ? (
        <p style={{ ...inputStyle, ...impersonatingStyle }}>{props.actualOrganization.name} ({props.actualOrganization.id})</p>
      ) : null}
    </div>
  )
}
OrganizationVisual.propTypes =  { organization: monikerShape.isRequired
                                , actualOrganization: monikerShape
                                , title: PropTypes.string.isRequired
                                }

export default OrganizationVisual
