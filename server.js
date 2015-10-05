'use strict';

var express = require('express')
  , _ = require('lodash')

/**
 * The server
 * @module server
 */

module.exports = function (config, paths, log) {
  var server = express()
  _.merge(server.settings, config)
  _.merge(server.locals, paths)
  server.log = log
  shortcut('trace')
  shortcut('debug')
  shortcut('info')
  shortcut('warn')
  shortcut('error')

  require('./lib')(server)
  return server

  function shortcut(name) {
    server[name] = function() {
      log[name].apply(log, arguments)
    }
  }
}

