import  { TOGGLE_VISIBILITY
        , ADD_TOGGLE
        , SET_VISIBILITY
        , SET_THEME
        } from '../constants'
import { createAction } from 'redux-actions'

export const addToggle = createAction(ADD_TOGGLE, (key, values) => ({ key, values }))
export const toggleVisibility = createAction(TOGGLE_VISIBILITY, key => ({ key }))
export const setVisibility = createAction(SET_VISIBILITY, (key, value) => ({ key, value }))
export const setTheme = createAction(SET_THEME, name => ({ name }))
