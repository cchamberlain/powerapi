import { DefinePlugin, HotModuleReplacementPlugin, NoErrorsPlugin, SourceMapDevToolPlugin, ProvidePlugin, IgnorePlugin, optimize } from 'webpack'
import { server, client, baseUrl } from '../config.server'
import CompressionPlugin from 'compression-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
const { CommonsChunkPlugin, UglifyJsPlugin, OccurenceOrderPlugin } = optimize



const getDefinePlugin = name => new DefinePlugin( { __CLIENT__: true
                                                  , __SERVER__: false
                                                  , __SHIM__: name === 'shim'
                                                  , __HOT__: process.env.NODE_ENV === 'hot'
                                                  , __BASEURL__: baseUrl
                                                  , __DEV__: server.flags.dev
                                                  , __REPORTERRORS__: `'Please email details of the error to <a href="mailto:${server.reportErrors.email}?subject=Tix%20Error" target="_top">${server.reportErrors.name || 'Tix Errors'}</a>.'`
                                                  //, 'process.env': { NODE_ENV: JSON.stringify(server.flags.dev ? 'development' : 'production') }
                                                  } )

export const extractText = loader => ExtractTextPlugin.extract(loader)

export const getPlugins = name => {
  let plugins = [ getDefinePlugin(name) ]
  if(name === 'shim') {
    plugins.push(new ExtractTextPlugin('[name]-shim.css', { allChunks: true, disable: false }))
  } else if(process.env.NODE_ENV !== 'hot' && name !== 'static') {
    plugins.push(new CommonsChunkPlugin({ name: 'commons'
                                        , filename: 'commons.js'
                                        , chunks: ['app', 'timeout']
                                        , minChunks: 2
                                        }))
    plugins.push(new ExtractTextPlugin(`[name].css`, { allChunks: true, disable: false }))
  }
  return plugins.concat(getCommonPlugins(name))
}

function getCommonPlugins(name) {
  let plugins = [ new OccurenceOrderPlugin(true)
                , new ProvidePlugin({ $: 'jquery'
                                    , jQuery: 'jquery'
                                    , 'window.$': 'jquery'
                                    , 'window.jQuery': 'jquery'
                                    })
                ]

  if(/^win/.test(process.platform))
    plugins.push(new IgnorePlugin(/dtrace-provider/i))

  if(process.env.NODE_ENV === 'hot' && name !== 'shim' && name !== 'static') {
    console.warn('HOT PLUGINS')
    plugins.push(new HotModuleReplacementPlugin())
    plugins.push(new NoErrorsPlugin())
    plugins.push(new SourceMapDevToolPlugin('[file].map', null, '[absolute-resource-path]'))
    //, "[absolute-resource-path]")
    //plugins.push(webpack_isomorphic_tools_plugin)
  }

  if(server.flags.minify) {
    //TODO: DedupePlugin breaking IE8 and watch
    //plugins.push(new webpack.optimize.DedupePlugin())
    var uglifyOptions = { compress: { warnings: false } }
    plugins.push(new UglifyJsPlugin(uglifyOptions))
    plugins.push(new CompressionPlugin( { asset: 'gz/{file}'
                                        , algorithm: 'gzip'
                                        , regExp: /\.(js|css|html|json|ico|eot|otf|ttf)$/
                                        //, threshold: 10240
                                        //, minRatio: 0.8
                                        , minRatio: 100
                                        } ))
  } else if(name === 'shim') {
    //plugins.push(new UglifyJsPlugin({ sourceMap: false }))
  }
  return plugins
}


/*
var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')
var webpack_isomorphic_tools_plugin =
  // webpack-isomorphic-tools settings reside in a separate .js file
  // (because they will be used in the web server code too).
  new Webpack_isomorphic_tools_plugin(require('../webpack-isomorphic-tools-configuration'))
  // also enter development mode since it's a development webpack configuration
  // (see below for explanation)
  .development()
export function isomorphicLoader() {
  return {
    test: webpack_isomorphic_tools_plugin.regular_expression('images'),
    loader: 'url-loader?limit=10240' // any image below or equal to 10K will be converted to inline base64 instead
  }
}
*/
