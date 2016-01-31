import fs from 'fs'
import { client as staticConfig, createServerLogger } from '../config.server'
import { getCors } from './cors'
const logger = createServerLogger('api')

/**
 * API Module
 * Exposes apis for the application.
 * @module server/lib/api
 */

export default function configureApi(server) {
  const cors = getCors()
  staticConfig.STATIC = true

  //CORS middleware
  function allowCrossDomain(req, res, next) {
    if(req.method === 'OPTIONS') {
      cors.handlePreflight(req, res)
    } else {
      cors.handle(req, res)
      next()
    }
  }

  server.use(allowCrossDomain)
  server.get('/api/env', (req, res) => res.json({ NODE_ENV: process.env.NODE_ENV }))
  server.get('/api/client-config', function (req, res) {
    requireQ(server.instance.locals.CLIENT_CONFIG_PATH)
      .then(clientConfig => {
        if (req.query.pretty === '' || req.query.pretty) {
          res.send(`<html><head><title>powerapi client config</title></head><body><pre>${JSON.stringify(clientConfig, null, 4)}</pre></body></html>`)
        } else {
          res.json(clientConfig)
        }
      }, err => {
        logger.error(err, 'error occurred during client-config')
        res.json(staticConfig)
      })
  })
}

function requireQ(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err)
        reject(err)
      else
        resolve(JSON.parse(data))
    })
  })
}
