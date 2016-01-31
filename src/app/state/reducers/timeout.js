import Immutable from 'immutable'
import  { ACTIVE_SESSION
        , INACTIVE_SESSION
        , EXPIRED_SESSION
        } from '../constants'


const idleStateMap = new Map([[0, 'active'], [1, 'inactive'], [2, 'expired']])

function idleStateIndex(state = 0, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case ACTIVE_SESSION:
      return error ? 2 : 0
    case INACTIVE_SESSION:
      return error ? 2 : 1
    case EXPIRED_SESSION:
      return 2
  }
  return state
}

function idleState(state = idleStateMap.get(0), action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case ACTIVE_SESSION:
      return idleStateMap.get(error ? 2 : 0)
    case INACTIVE_SESSION:
      return idleStateMap.get(error ? 2 : 1)
    case EXPIRED_SESSION:
      return idleStateMap.get(2)
  }
  return state
}

const defaultInactiveMS = 60000
const defaultExpireMS = 120000

function inactiveMS(state = defaultInactiveMS, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case ACTIVE_SESSION:
    case INACTIVE_SESSION:
    case EXPIRED_SESSION:
      return defaultInactiveMS
  }
  return state
}

function expireMS(state = defaultExpireMS, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case ACTIVE_SESSION:
    case INACTIVE_SESSION:
    case EXPIRED_SESSION:
      return defaultExpireMS
  }
  return state
}


const initialState =  Immutable.Map({ idleState: idleState()
                                    , idleStateIndex: idleStateIndex()
                                    , inactiveMS: inactiveMS()
                                    , expireMS: expireMS()
                                    })

export default function timeout(state = initialState, action) {
  const { type, payload, error } = action
  switch(type) {
    case ACTIVE_SESSION:
    case INACTIVE_SESSION:
    case EXPIRED_SESSION:
      return state.merge( { idleState: idleState(state, action)
                          , idleStateIndex: idleStateIndex(state, action)
                          , inactiveMS: inactiveMS(state, action)
                          , expireMS: expireMS(state, action)
                          })
  }
  return state
}
