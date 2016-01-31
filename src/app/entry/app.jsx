import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app/App'

import { injectElementIntoDOM } from './dom/elements'
import { injectFNIntoDOM } from './dom/fn'
import { injectConfigIntoDOM } from './dom/config'
import { injectWTFIntoDOM } from './dom/wtf'

import configureStore from 'state/store/configureStore'
import { interceptDOMErrors } from 'services/events'
const store = configureStore()

//interceptDOMErrors(err => console.error(err))

injectWTFIntoDOM()
injectConfigIntoDOM()
injectFNIntoDOM()
injectElementIntoDOM('app')
  .then(app => {
    if(window.powerapi.loading && !window.powerapi.loading.isDisposed)
      window.powerapi.loading.dispose()
    ReactDOM.render(<App store={store} ref={x => app.ref = x} />, app)
  })
  //.catch(err => { console.error(err) })
