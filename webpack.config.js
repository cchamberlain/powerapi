var config = require('./config-server')
module.exports = require('./make-webpack-config')(
  { devtool: "source-map"
  , debug: config.flags.debug
  , watch: config.flags.debug
  , minifyJs: config.flags.minifyJs
  , minifyCss: config.flags.minifyCss
  , gzipJs: config.flags.gzipJs
  , gzipCss: config.flags.gzipCss 
  })