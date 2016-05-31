import { log } from '../config'

import procmux from 'procmux'
import co from 'co'

const should = require('chai').should()

co(function* () {
  console.warn('CO')

  const mux = procmux()

  console.warn('MUX CREATED')

  const build = yield mux.fork('build', 'bin/build.js')
  build.dispatch({ type: 'BUILD' })
  build.listeners.action(action => {
    console.warn('BUILD|DISPATCHRECEIVE', action)
    if(action.type === 'BUILD_FINISH') {
      co(function* () {
        const run = yield mux.fork('run', 'bin/run.js')
        run.dispatch({ type: 'RUN' })
        run.listeners.action(action => {
          console.warn('RUN|DISPATCHRECEIVE', action)
        })
      })
    }
  })

}).catch(err => console.error(err, 'ERROR OCCURRED DURING CO'))
