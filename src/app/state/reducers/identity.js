import Immutable from 'immutable'
import  { FORGET_TOKENS
        , FORGET_FINGERPRINT
        , FETCH_IDENTITY
        , SET_IDENTITY
        , POST_AUTHORIZE
        , POST_AUTHORIZE_ADMIN
        , IDENTITY_INVALID
        , IDENTITY_EXPIRED
        , DISMISS_ERROR
        , AUTHORIZE_MIDDLEWARE
        } from '../constants'

const getTixClaimSchema = name => `http://schemas.tix.com/identity/claims/${name}`
const getClaim = (decodedToken, name) => decodedToken[name]
const hasTixClaim = (decodedToken, name, value) => hasClaim(decodedToken, getTixClaimSchema(name), value)
const getTixClaim = (decodedToken, name) => getClaim(decodedToken, getTixClaimSchema(name))
const hasRole = (decodedToken, roleName) => hasClaim(decodedToken, getTixClaimSchema('role'), roleName)
const hasClaim = (decodedToken, name, value) => {
  let claim = getClaim(decodedToken, name)
  // if claim exists but value was not specified, return true
  if (claim && !value)
    return true
  if (claim)
    return Array.isArray(claim) ? claim.indexOf(value) !== -1 : claim === value
}


function tokens(state = null, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case SET_IDENTITY:
      if(error || !payload.tokens)
        return null
      return payload.tokens
    case FORGET_TOKENS:
    case IDENTITY_INVALID:
      return null
    case AUTHORIZE_MIDDLEWARE:
      return error ? null : state
  }
  return state
}

function fingerprint(state = null, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case FORGET_FINGERPRINT:
      return null
    case SET_IDENTITY:
      if(error)
        return null
      const { decodedToken } = payload
      return getTixClaim(decodedToken, 'fingerprint')
  }
  return state
}

function errors(state = Immutable.List(), action = {}) {
  const { type, payload, error } = action
  if(error)
    return state.unshift(payload)
  else {
    switch(type) {
      case DISMISS_ERROR:
        const { id, category } = payload
        return category === 'identity' ? state.delete(id) : state
      case SET_IDENTITY:
        return state.clear()
    }
  }
  return state
}

function isFetching(state = false, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case FETCH_IDENTITY:
      return true
    case SET_IDENTITY:
      return false
  }
  return state
}

function isAuthorized(state = false, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case FORGET_TOKENS:
    case FORGET_FINGERPRINT:
    case IDENTITY_INVALID:
    //case IDENTITY_EXPIRED:
      return false
    case AUTHORIZE_MIDDLEWARE:
      return error ? false : state
    case SET_IDENTITY:
      return error ? false : true
  }
  return state
}

function isAdmin(state = false, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case FORGET_TOKENS:
    case FORGET_FINGERPRINT:
    case IDENTITY_INVALID:
    //case IDENTITY_EXPIRED:
      return false
    case AUTHORIZE_MIDDLEWARE:
      return error ? false : state
    case SET_IDENTITY:
      if(error)
        return false
      const { decodedToken } = payload
      const id = getTixClaim(decodedToken, 'actualorganizationid')
      return id === 1
  }
  return state
}

function subject(state = null, action = {}) {
  const { type, payload, error } = action
  if(error)
    return state
  switch(type) {
    case SET_IDENTITY:
      const { decodedToken } = payload
      return getClaim(decodedToken, 'sub')
  }
  return state
}

function user(state = null, action = {}) {
  const { type, payload, error } = action

  switch(type) {
    case FORGET_TOKENS:
    case FORGET_FINGERPRINT:
    case IDENTITY_INVALID:
    //case IDENTITY_EXPIRED:
      return null
    case AUTHORIZE_MIDDLEWARE:
      return error ? null : state
    case SET_IDENTITY:
      if(error)
        return null
      const { decodedToken } = payload
      let fullName = getTixClaim(decodedToken, 'username') // userfullname
      /** Probably should switch this parsing around to return 'userfirstname' and 'userlastname' */
      let sanitizedFullName = fullName ? fullName.trim() : 'Unknown Name'
      let nameParts = sanitizedFullName.split(' ').map(x => x.trim()).filter(x => x && x.length > 0)
      let [ firstName, ...lastNames ] = nameParts
      return  { username: getClaim(decodedToken, 'sub')
              , id: getTixClaim(decodedToken, 'userid')
              , fullName
              , firstName
              , lastName: lastNames.join(' ')
              }
  }
  return state
}

function actualUser(state = null, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case FORGET_TOKENS:
    case FORGET_FINGERPRINT:
    case IDENTITY_INVALID:
    //case IDENTITY_EXPIRED:
      return null
    case AUTHORIZE_MIDDLEWARE:
      return error ? null : state
    case SET_IDENTITY:
      if(error)
        return null
      const { decodedToken } = payload
      return  { username: getTixClaim(decodedToken, 'actualusername') || 'No Actual Username' // 'implement?'
              , id: getTixClaim(decodedToken, 'actualuserid') || 'No Actual User Id'
              , fullName: getTixClaim(decodedToken, 'actualfullName') || 'No Full Name' // 'implement?'
              , firstName: getTixClaim(decodedToken, 'actualfirstname') // 'implement?'
              , lastName: getTixClaim(decodedToken, 'actuallastname') // 'implement?'
              }
  }
  return state
}

function organization(state = null, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case FORGET_TOKENS:
    case FORGET_FINGERPRINT:
    case IDENTITY_INVALID:
    //case IDENTITY_EXPIRED:
      return null
    case AUTHORIZE_MIDDLEWARE:
      return error ? null : state
    case SET_IDENTITY:
      if(error)
        return null
      const { decodedToken } = payload
      return  { id: getTixClaim(decodedToken, 'organizationid')
              , name: getTixClaim(decodedToken, 'organization') // organizationname
              }
  }
  return state
}

function actualOrganization(state = null, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case FORGET_TOKENS:
    case FORGET_FINGERPRINT:
    case IDENTITY_INVALID:
    //case IDENTITY_EXPIRED:
      return null
    case AUTHORIZE_MIDDLEWARE:
      return error ? null : state
    case SET_IDENTITY:
      if(error)
        return null
      const { decodedToken } = payload
      let id = getTixClaim(decodedToken, 'actualorganizationid')
      return  { id
              , name: id === 1 ? 'Tix' : getTixClaim(decodedToken, 'organization') // actualorganizationname
              }
  }
  return state
}


const initialState =  Immutable.Map({ isFetching: isFetching()
                                    , isAuthorized: isAuthorized()
                                    , isAdmin: isAdmin()
                                    , subject: subject()
                                    , user: user()
                                    , actualUser: actualUser()
                                    , organization: organization()
                                    , actualOrganization: actualOrganization()
                                    , tokens: tokens()
                                    , fingerprint: fingerprint()
                                    , errors: errors()
                                    })


export default function identity(state = initialState, action) {
  const { type, payload, error } = action
  switch(type) {
    case FETCH_IDENTITY:
    case SET_IDENTITY:
    case FORGET_TOKENS:
    case FORGET_FINGERPRINT:
    case IDENTITY_INVALID:
    case IDENTITY_EXPIRED:
    case AUTHORIZE_MIDDLEWARE:
      return state.merge( { isFetching: isFetching(state.isFetching, action)
                          , isAuthorized: isAuthorized(state.isAuthorized, action)
                          , isAdmin: isAdmin(state.isAdmin, action)
                          , subject: subject(state.subject, action)
                          , user: user(state.user, action)
                          , actualUser: actualUser(state.actualUser, action)
                          , organization: organization(state.organization, action)
                          , actualOrganization: actualOrganization(state.actualOrganization, action)
                          , tokens: tokens(state.tokens, action)
                          , fingerprint: fingerprint(state.fingerprint, action)
                          , errors: errors(state.errors, action)
                          })
  }
  return state
}
