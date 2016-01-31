import { saveState, loadState, removeState } from 'services/state'
import  { forgottenTokens
        , forgottenFingerprint
        , persistedTokens
        , persistedFingerprint
        , postAuthorize
        , postAuthorizeAdmin
        } from './actions/identity'


const selectTokens = state => state.identity ? state.identity.tokens : null
const selectFingerprint = state => state.identity ? state.identity.fingerprint : null
const selectIsAuthorized = state => state.identity ? state.identity.isAuthorized : false
const selectIsAdmin = state => state.identity ? state.identity.isAdmin : false


/** PERSISTS AND REMOVES TOKEN AND FINGERPRINT COOKIES IN RESPONSE TO NEW STATES */
export const subscribeCookieHandler = store => {
  let currentTokens = null
  let currentFingerprint = null
  return store.subscribe(() => {
    let previousTokens = currentTokens
    let previousFingerprint = currentFingerprint
    let state = store.getState()
    currentTokens = selectTokens(state)
    currentFingerprint = selectFingerprint(state)

    if(currentTokens !== previousTokens) {
      if(currentTokens) {
        let { access, refresh } = currentTokens
        saveState({ tokens: [ access, refresh ]})
        store.dispatch(persistedTokens())
      } else {
        removeState(['tokens'])
        store.dispatch(forgottenTokens())
      }
    }

    if(currentFingerprint !== previousFingerprint) {
      if(currentFingerprint) {
        saveState({ fingerprint: currentFingerprint })
        store.dispatch(persistedFingerprint())
      } else {
        removeState(['fingerprint'])
        store.dispatch(forgottenFingerprint())
      }
    }
  })
}


export const subscribePostAuthorizeHandler = store => {
  let currentIsAuthorized = null
  let currentIsAdmin = null
  return store.subscribe(() => {
    let previousIsAuthorized = currentIsAuthorized
    let previousIsAdmin = currentIsAdmin
    let state = store.getState()
    currentIsAuthorized = selectIsAuthorized(state)
    currentIsAdmin = selectIsAdmin(state)

    if(currentIsAuthorized !== previousIsAuthorized) {
      if(currentIsAuthorized) {
        store.dispatch(postAuthorize())
      }
    }

    if(currentIsAdmin !== previousIsAdmin) {
      if(currentIsAdmin) {
        store.dispatch(postAuthorizeAdmin())
      }
    }
  })
}
