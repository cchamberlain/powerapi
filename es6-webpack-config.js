import path from 'path'
import webpack from 'webpack'

let join = path.join

export default function makeConfig(options) {
  let root = join(__dirname, "app")
  let loaders = [ //{ test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' }
                //, { test: /\.jsx?$/, loaders: ['babel'], include: path.join(__dirname, "app") }
               // ,
                { test: /\.js$|\.jsx$|\.es6$|\.babel$/, include: /app/, exclude: /node_modules/
                  , loader: 'babel'
                  , query:  { stage: 0
                            , optional: "runtime"
                            , plugins: ['react-transform']
                            , "extra":
                              { "react-transform":
                                { "transforms":
                                  [ { "transform": "react-transform-hmr"
                                    , "imports": ["react"]
                                    , "locals": ["module"]
                                    }
                                  , { "transform": "react-transform-catch-errors"
                                    , "imports": ["react", "redbox-react"]
                                    }
                                  ]
                                }
                              }
                            }
                  }
                  , { test: /\.json$/, loader: "json-loader" }
                  , { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
                  , { test: /\.css$/, loader: 'style-loader!css-loader' }
                  , { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" }
                  , { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
                ]

  let extensions = ["", ".webpack.js", ".web.js", ".js", ".jsx"]

  // new webpack.optimize.OccurenceOrderPlugin()
  let plugins =
  [ new webpack.HotModuleReplacementPlugin()
  , new webpack.NoErrorsPlugin()
  //, new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery","window.jQuery": "jquery" })
  ]


  return  { devtool: 'eval'
          , cache: true
          //, context: __dirname
          , entry:
            { common: './app/styles/common.less'
            //[ 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
            //, 'bootstrap-webpack!./config/bootstrap.config.js'
              , app:  [ 'webpack-hot-middleware/client'
                      , './app/index'
                      ]
            }
          , output:
            { path: join(__dirname, 'dist')
              //path: join(__dirname, 'build', 'assets')
            , filename: '[name].bundle.js'
            , chunkFilename: "[id].bundle.js"
            , publicPath: '/static/'
            }
            /*
          , resolveLoader:
            { modulesDirectories: ['web_modules', 'node_modules']
            }
            */
          , resolve:
            { root: root
            //, alias: { 'react/lib': path.resolve('node_modules', 'react/lib') }
            , extensions: extensions
            , modulesDirectories: [ 'web_modules', 'node_modules' ]
            //, fallback: [ 'node_modules/bootstrap/fonts' ]
            }
          , module: { loaders: loaders }
          , plugins: plugins
          }
}
