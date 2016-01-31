import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import { subscribeCookieHandler, subscribePostAuthorizeHandler } from '../subscriptions'

const loggerMiddleware = createLogger()

const composeStore = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore)

export default function configureStore() {
  const store = composeStore(rootReducer)

  const unsubscribeCookieHandler = subscribeCookieHandler(store)
  const unsubscribePostAuthorizeHandler = subscribePostAuthorizeHandler(store)

  return store
}

