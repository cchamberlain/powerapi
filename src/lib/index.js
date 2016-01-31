import Server from './server'
import express from 'express'
import { createLogger } from 'bunyan'

const logger = createLogger({ name: 'lib', level: 'debug' })

/**
 * The server
 * @module server
 */

/** Which config name to use when hot reloading */
const hotConfigName = 'app'

export function getServer ({ config, paths }) {
  let opts = { settings: config, locals: paths }
  let server = new Server(opts)

  if (process.env.NODE_ENV === 'hot') {
    let webpackConfig = require('../webpack.config')
    let hotConfig = Array.isArray(webpackConfig) ? webpackConfig.filter(x => x.name === hotConfigName)[0] : webpackConfig

    let compiler = require('webpack')(hotConfig)
    server.use(require('webpack-dev-middleware')(compiler,  { noInfo: true
                                                            , publicPath: hotConfig.output.publicPath
                                                            }))
    server.use(require('webpack-hot-middleware')(compiler))
    server.use('/img', express.static('public/img'))
    server.use('/static', express.static('public/static'))
  }
  server.route()

  let environment = { NODE_ENV: process.env.NODE_ENV }
  logger.info(environment, `ENVIRONMENT => ${JSON.stringify(environment)}`)
  return server
}

export function startServer({ isHttps, pfxName, passphrase }) {
  if(isHttps) {
    readPfx(pfxName, passphrase || process.env.PASSPHRASE)
      .then(opts => this.startHttps(binding, opts))
      .catch(err => {
        logger.fatal(err, 'A fatal error occurred starting the server.')
        setTimeout(() => process.exit(1), 4000)
      })
  }
}
