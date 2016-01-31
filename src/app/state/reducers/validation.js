import Immutable from 'immutable'
import  { SET_VALIDATED
        , CLEAR_VALIDATED
        } from '../constants'

const initialValidated =  [ ['recaptcha', false ]
                          ]
function validated(state = Immutable.Map(initialValidated), action = {}) {
  const { type, payload, error } = action
  if(error)
    return state
  switch(type) {
    case SET_VALIDATED:
      return state.set(payload.key, true)
    case CLEAR_VALIDATED:
      return state.set(payload.key, false)
  }
  return state
}

const initialState = Immutable.Map({ validated: validated() })

export default function validation(state = initialState, action) {
  const { type, payload, error } = action
  switch(type) {
    case SET_VALIDATED:
    case CLEAR_VALIDATED:
      return state.merge({ validated: validated(state.validated, action) })
  }
  return state
}
