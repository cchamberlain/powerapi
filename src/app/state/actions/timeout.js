import  { ACTIVE_SESSION
        , INACTIVE_SESSION
        , EXPIRED_SESSION
        } from '../constants'
import { createAction } from 'redux-actions'
import { authorizeIdentity } from './identity'

export const activeSession = createAction(ACTIVE_SESSION)
export const inactiveSession = createAction(INACTIVE_SESSION)
export const expiredSession = createAction(EXPIRED_SESSION)

export const onLoginAttempt = credentials => {
  return (dispatch, getState) => {
    dispatch(authorizeIdentity(credentials))
      .then(() => dispatch(activeSession()))
      .catch(err => dispatch(activeSession(err)))
  }
}
