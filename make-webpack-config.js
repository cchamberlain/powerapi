var path = require("path")
  , join = path.join
  , webpack = require("webpack")
  , ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = function(options) {
  var root = path.join(__dirname, "app")
  var loaders = [ { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' }
                , { test: /\.jsx$/, loader: "babel-loader?stage=0", include: path.join(__dirname, "app") }
                , { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query:
                    { plugins: ['react-transform']
                    , extra: { 'react-transform':
                                { transforms: [ { transform: 'react-transform-hmr'
                                      , imports: ['react']
                                      , locals: ['module']
                                      }
                                    , { transform: 'react-transform-catch-errors'
                                      , imports: ['react', 'redbox-react']
                                      }
                                    ]
                                }
                              }
                    }
                  }
                , { test: /\.json$/, loader: "json-loader" }
                , { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
                , { test: /\.css$/, loader: 'style-loader!css-loader' }
                //, { test: /\.less$/, loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap') }
                , { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" }
                , { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
                ]

  var extensions = ["", ".webpack.js", ".web.js", ".js", ".jsx"]

  var plugins = [ /*new webpack.PrefetchPlugin("react")
                , new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")*/
                , new webpack.optimize.OccurenceOrderPlugin(),
                , new webpack.HotModuleReplacementPlugin(),
                , new webpack.NoErrorsPlugin()
                , new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery","window.jQuery": "jquery" })
                ]

  if(options.minifyJs) {
    plugins.push(new webpack.optimize.DedupePlugin())
    plugins.push(new webpack.optimize.UglifyJsPlugin())
  }
  // plugins.push(new ExtractTextPlugin('powerapi.css'))

  return  { devtool: '#source-map'
          //, cache: true
          //, watch: options.watch
          //, devtool: options.devtool || 'eval'
          , context: __dirname
          , entry:  [ 'bootstrap-webpack!./config/bootstrap.config.js'
                    , 'font-awesome-webpack!./config/font-awesome.config.js'
                    , 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
                    , './app/index.jsx'
                    ]
          , output: { path: join(__dirname, 'build', 'assets')
                    //, publicPath: 'http://localhost:2992/assets/'
                    , publicPath: '/'
                    , filename: 'powerapi.js'
                    , chunkFilename: "[chunkhash].js"
                    }
          , resolve:  { root: root
                      , extensions: extensions
                      , modulesDirectories: [ 'web_modules', 'node_modules' ]
                      , fallback: [ 'node_modules/bootstrap/fonts' ]
                      }
          , module: { loaders: loaders }
          , plugins: plugins
          , devServer:  { stats: { cached: true } }
          }
}
