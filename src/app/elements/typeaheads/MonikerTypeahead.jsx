import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import bindAll from 'lodash.bindall'
import './MonikerTypeahead.less'
import contextTypes from 'app/context'

import Autosuggest from 'react-autosuggest'



const formatMoniker = ({ id, name })=> `${name} (${id})`


export const monikerShape = PropTypes.shape({ id: PropTypes.number.isRequired
                                            , name: PropTypes.string.isRequired
                                            })

const Moniker = props => (<span>{props.name} ({props.id})</span>)

class MonikerTypeahead extends Component {
  static contextTypes = contextTypes;
  constructor(props) {
    super(props)
    bindAll(this, ['onSuggestionsUpdateRequested', 'onSuggestionSelected', 'onChange', 'onClick'])
  }
  render() {
    const { id, monikers, onSelected } = this.props
    const { style } = this.context.theme
    const { title, selectedMoniker, value, suggestions, isLoading, isFetching, onChange, onSuggestionsUpdateRequested } = this.props
    const inputProps =  { placeholder: formatMoniker(selectedMoniker)
                        , value
                        , onChange: this.onChange
                        , onClick: this.onClick
                        , style: style.input
                        }
    const getIcon = () => (
      this.props.showOverlay ? <button className="overlay label label-danger" onClick={this.props.overlayClicked}>{this.props.overlayText}</button> : null
    )
    return (
      <div>
        {title ? <label className="control-label">{title}</label> : null}
        <div className="right-inner-addon">
          {getIcon()}
          <Autosuggest
            id={id}
            suggestions={suggestions}
            onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={formatMoniker}
            renderSuggestion={Moniker}
            inputProps={inputProps}
          />
        </div>
      </div>
    )
  }
  onSuggestionsUpdateRequested({ value, reason }) {
    switch(reason) {
      case 'type':
      case 'click':
      case 'enter':
      case 'escape':
      case 'blur':
      default:
      this.props.loadSuggestions(value)
    }
  }
  onSuggestionSelected(e, { suggestion, suggestionValue, method }) {
    switch(method) {
      case 'click':
      case 'enter':
      default:
        this.props.onSelected(suggestion)
        this.props.updateInputValue('')
    }
  }
  onChange(e, { newValue, method }) {
    const value = newValue.trim()
    switch(method) {
      case 'escape':
        this.props.clearSuggestions()
        this.props.updateInputValue('')
        return
      case 'click':
      case 'down':
      case 'up':
      case 'type':
      default:
        this.props.updateInputValue(value)
        if(value === '')
          this.props.clearSuggestions()
    }
  }
  onClick(e) {
    this.props.updateInputValue('')
  }
}
MonikerTypeahead.propTypes =  { suggestions: PropTypes.arrayOf(monikerShape).isRequired
                              , isFetching: PropTypes.bool
                              , onSelected: PropTypes.func.isRequired
                              , selectedMoniker: monikerShape.isRequired
                              , title: PropTypes.string
                              }

export default MonikerTypeahead
