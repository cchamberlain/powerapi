import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import makeConfig from '../es6-webpack-config'

import Server from './server'
let webpackConfig = makeConfig()
let compiler = webpack(webpackConfig)

let server = new Server({ hostname: 'localhost'
                        , port: 8080
                        })

server.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}))
server.use(webpackHotMiddleware(compiler))

server.start()
