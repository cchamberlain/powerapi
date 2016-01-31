#! /usr/bin/env node

/**
 * Transforms client and server json configurations.
 */

import fs from 'graceful-fs'
import deasync from 'deasync'
import { createLogger } from 'bunyan'
import { configify } from '../lib/services/configify'
import { serverConfigs, clientConfigs } from '../etc'

const logger = createLogger({ name: 'configure', level: 'info' })

export default function configure (target) {
  return transformConfigs(target).then(([configServer, configClient]) => {
    let writePromises = [ writeConfig('config-server.json', configServer)
                        , writeConfig('config-client.json', configClient)
                        ]
    return Promise.all(writePromises).then(results => {
      logger.info(`configs [${results.map(x => x.configName).join(', ')}] transformed and written successfully`)
    })
  })
}

function writeConfig (configName, config) {
  return new Promise((resolve, reject) => {
    fs.writeFile(configName, JSON.stringify(config, null, 2), err => {
      if (err)
        return reject(err)
      resolve({ configName, config })
    })
  })
}

function transformConfigs(target) {
  if(!serverConfigs[target])
    throw Error(`Target server configuration does not exist -> ${target}`)
  if(!clientConfigs[target])
    throw Error(`Target client configuration does not exist -> ${target}`)

  return Promise.all( [ configify([ serverConfigs.common, serverConfigs[target] ])
                      , configify([ clientConfigs.common, clientConfigs[target] ])
                      ])
}

if (!module.parent) {
  let args = process.argv.slice(2)
  let target = args.length > 0 ? args[0].toLowerCase() : 'debug'
  let done = false
  configure(target).then(() => done = true)
  deasync.loopWhile(() => !done)
  logger.info(`CONFIGURED ${target.toUpperCase()}`)
}
