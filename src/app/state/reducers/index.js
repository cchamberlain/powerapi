import { combineReducers } from 'redux-immutable'
//import { reducer as form } from 'redux-form'
import route from './route'
//import identity from './identity'
//import api from './api'
import autocomplete from './autocomplete'
import visual from './visual'
//import validation from './validation'

const reducers =  combineReducers({ autocomplete
                                  , visual
                                  , route
                                  //, identity
                                  //, api
                                  //, form
                                  //, validation
                                  })
export default reducers
