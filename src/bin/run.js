#! /usr/bin/env node

import fs from 'fs'
import mkdirp from 'mkdirp'
import { getServer } from '../lib'
import { join, resolve } from 'path'
import { server as serverConfig, __rootname, resolveRoot, createServerLogger } from '../config.server'
const logger = createServerLogger('run')

const serverPaths = { NODE_ROOT: __rootname
                    , PUBLIC_ROOT: resolveRoot('public')
                    , STATIC_ROOT: resolveRoot('public/static')
                    , BIN_ROOT: resolveRoot(serverConfig.fs.BIN_ROOT)
                    , LOG_ROOT: resolveRoot(serverConfig.fs.LOG_ROOT)
                    }

logger.info({ paths: serverPaths})

/** Create log root */
mkdirp(serverPaths.LOG_ROOT, err => {
  if (err) {
    console.error('An error occurred attempting to create log directory.', err)
    process.exit(1)
  }

  let server = getServer({ config: serverConfig, paths: serverPaths })
  server.start()
})
