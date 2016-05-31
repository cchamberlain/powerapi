#! /usr/bin/env node
import 'babel-polyfill'
import procmux from 'procmux'

import { server, log } from '../config'
import createServer, { definePaths } from '../lib'

const run = () => definePaths()
  .then(paths => {
    log.info({ paths })
    return createServer(paths).get('http').start()
  })
  .catch(err => log.fatal(err, 'A fatal error occurred.'))

/*
const mux = procmux((state = {}, action = {}) => {
  console.warn('BUILD|REDUCE', state, action)
  switch(action.type) {
    case 'RUN':
      return { ...state, status: 'RUNNING' }
    case 'FINISHED':
      return { ...state, status: 'IDLE' }
  }
  return state
})

mux.register('RUN', run)
mux.init(run)
*/

let startDelay = 20000
setTimeout(() => {
  log.info('STARTING AFTER 20 SECOND BUILD DELAY')
  module.export = run()
}, startDelay)

