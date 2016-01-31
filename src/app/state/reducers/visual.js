import Immutable from 'immutable'
import  { TOGGLE_VISIBILITY
        , ADD_TOGGLE
        , SET_VISIBILITY
        , SET_THEME
        } from '../constants'

let visibilityMap = new Map([ ['login-reset',           ['login', 'reset'] ]
                            , ['reset-update_password', ['reset', 'update']]
                            , ['theme-panel', [false, true]]
                            , ['maintenance_reset-update-migrate', ['reset', 'update', 'migrate']]
                            ])

const initialVisibility = [...visibilityMap.keys()].map(key => [key, visibilityMap.get(key)[0] ])
function visibility(state = Immutable.Map(initialVisibility), action = {}) {
  const { type, payload, error } = action
  if(error)
    return state
  switch(type) {
    case ADD_TOGGLE:
      visibilityMap.add(payload.key, payload.values)
      return state.set(payload.key, payload.values[0])
    case TOGGLE_VISIBILITY:
      const values = visibilityMap.get(payload.key)
      return state.update(payload.key, previousValue => previousValue === values[0] ?  values[1] : values[0])
    case SET_VISIBILITY:
      return state.set(payload.key, payload.value)
  }
  return state
}


const initialTheme = 'powerapi-light'
function theme(state = initialTheme, action = {}) {
  const { type, payload, error } = action
  if(error)
    return state
  switch(type) {
    case SET_THEME:
      return payload.name
  }
  return state
}

const initialState = Immutable.fromJS({ visibility: visibility(), theme: theme() })

export default (state = initialState, action) => {
  const { type, payload, error } = action
  switch(type) {
    case ADD_TOGGLE:
    case TOGGLE_VISIBILITY:
    case SET_VISIBILITY:
      return state.merge({ visibility: visibility(state.visibility, action) })
    case SET_THEME:
      return state.merge({ theme: theme(state.theme, action)})
  }
  return state
}
