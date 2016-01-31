import Immutable from 'immutable'
import  { CLEAR_DATA
        , FETCH_DATA
        , RECEIVE_DATA
        , KEYED_DATA
        , AUTHORIZE_MIDDLEWARE
        , DISMISS_ERROR
        , RECEIVE_AUTHORIZE_IDENTITY
        , RECEIVE_REFRESH_IDENTITY
        , RECEIVE_IMPERSONATE_IDENTITY
        } from '../constants'

function entities(state = Immutable.Map(), action = {}) {
  const { type, payload, error } = action
  if(error || !payload)
    return state
  const { apiName, actionName, actionKey, data } = payload
  switch(type) {
    case KEYED_DATA:
      return state.setIn([apiName, actionKey], data)
    case RECEIVE_DATA:
      return state.setIn([apiName, actionName], data)
    case CLEAR_DATA:
      return state.deleteIn([apiName, actionName])
  }
  return state
}

function isFetching(state = Immutable.Map(), action = {}) {
  const { type, payload, error } = action
  if(error || !payload)
    return state
  const { apiName, actionName, actionKey, inputData, data } = payload
  switch(type) {
    case FETCH_DATA:
      return state.setIn([apiName, actionName], true)
    case RECEIVE_DATA:
    case CLEAR_DATA:
      return state.setIn([apiName, actionName], false)
    case KEYED_DATA:
      return state.setIn([apiName, actionKey], false)
  }
  return state
}

function errors(state = Immutable.List(), action = {}) {
  const { type, payload, error } = action
  if(error) {
    return state.unshift(payload)
  } else {
    switch(type) {
      case DISMISS_ERROR:
        const { id, category } = payload
        return category === 'api' ? state.delete(id) : state
      case RECEIVE_AUTHORIZE_IDENTITY:
      case RECEIVE_REFRESH_IDENTITY:
      case RECEIVE_IMPERSONATE_IDENTITY:
        return state.clear()
    }
  }
  return state
}

const initialState =  Immutable.Map({ entities: entities()
                                    , isFetching: isFetching()
                                    , errors: errors()
                                    })

export default function api(state = initialState, action) {
  const { type, payload, error } = action
  switch(type) {
    case AUTHORIZE_MIDDLEWARE:
    case DISMISS_ERROR:
    case RECEIVE_AUTHORIZE_IDENTITY:
    case RECEIVE_REFRESH_IDENTITY:
    case RECEIVE_IMPERSONATE_IDENTITY:
      return state.merge({ errors: errors(state.errors, action) })
    case FETCH_DATA:
      return state.merge({ isFetching: isFetching(state.isFetching, action) })
    case RECEIVE_DATA:
    case KEYED_DATA:
    case CLEAR_DATA:
      return state.merge( { entities: entities(state.entities, action)
                          , isFetching: isFetching(state.isFetching, action)
                          , errors: errors(state.errors, action)
                          })
  }
  return state
}
