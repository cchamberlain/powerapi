import Immutable from 'immutable'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import DevTools from 'app/containers/DevTools'
//import { persistState } from 'redux-devtools'
import { subscribeCookieHandler, subscribePostAuthorizeHandler } from '../subscriptions'

const loggerMiddleware = createLogger()

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory)

const composeStore = compose( applyMiddleware(thunkMiddleware, loggerMiddleware, reduxRouterMiddleware)
                            , DevTools.instrument()
                            //, persistState(getDebugSessionKey())
                            )(createStore)


const initialState = Immutable.Map()

export default function configureStore() {
  const store = composeStore(rootReducer, initialState)
  reduxRouterMiddleware.listenForReplays(store, state => state.getIn(['route', 'location']).toJS())

  const unsubscribeCookieHandler = subscribeCookieHandler(store)
  const unsubscribePostAuthorizeHandler = subscribePostAuthorizeHandler(store)

  if(module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }
  return store
}


function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/)
  return (matches && matches.length > 0) ? matches[1] : null
}
