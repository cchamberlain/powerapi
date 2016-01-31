import noop from 'lodash.noop'
import { server, resolveRoot } from '../config.server'
import { extractText } from './plugins'

//const getImageLoader = () => server.flags.hot ? 'url-loader?limit=8192' : 'file?hash=sha512&digest=hex&name=[hash].[ext]!image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
const getImageLoader = () => 'url-loader?limit=8192'

export function getLoaders(name) {
  if(name === 'static')
    return [ { test: /\.js$/, loader: 'babel', exclude: /node_modules/ } ]
  const getStyleLoader = (hot, notHot) => process.env.NODE_ENV === 'hot' && name !== 'shim' ? hot : extractText(notHot)

  return  [ getJsxLoader(name)
          , { test: /\.json$/, loader: 'json' }
          /** @type {RegExp} Preloads .html files into angular template cache */
          , { test: /\.html$/, loader: `ngtemplate?relativeTo=${resolveRoot('./src/app/ng')}/!html`, include: /src/ }
          /** @type {RegExp} Loads .eshtml files with format <div>${scope.data}</div> */
          //, { test: /\.eshtml$/, loader: 'babel!template-string' }

          //** STYLE LOADERS */
          , { test: /\.css$/, loader: getStyleLoader('style!css', 'css?sourceMap!') }
          , { test: /\.less$/, loader: getStyleLoader('style!css!less', 'css?sourceMap!less?sourceMap') }
          //, { test: /\.scss$/, loader: getStyleLoader('style!css!sass', 'css?sourceMap!sass?sourceMap') }
          //, { test: /\.styl$/, loader: getStyleLoader('style!css!stylus', 'css?sourceMap!stylus?sourceMap') }

          /** @type {RegExp} Load fonts and images */
          //, webpackPlugins.isomorphicLoader()

          , { test: /\.png$/
            , loader: 'url?mimetype=image/png&limit=100000&name=[name].[ext]'
            }
          , { test: /\.(gif|png|jpe?g|svg)$/i
            , loader: getImageLoader()
            }
          , { test: /\.(otf|eot|woff|woff2|ttf|svg)(\?\S*)?$/i
            , loader: 'url?limit=100000&name=[name].[ext]'
            }
          //, { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&minetype=application/font-woff' }
          //, { test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
          //, { test: /\.(jpe?g|png|gif|svg)$/i, loaders: [ 'file?hash=sha512&digest=hex&name=[hash].[ext]','image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false' ] }
          /** @type {RegExp} Loads fontgen (font glyphs) into inline style script chunks */
          //, { test: /\.font\.(js|json)$/, loader: 'style!css!fontgen?types=woff,eot,ttf' }
          ]
}

const babelQuery = { presets:  [ 'es2015', 'stage-0', 'react'  ] }//, plugins: ['transform-es3-member-expression-literals', 'transform-es3-property-literals'] }
const babelLoader = `babel?${JSON.stringify(babelQuery)}`

export function getJsxLoader(name) {
  return  { test: /\.jsx?$/
          , loader: babelLoader
          , exclude: /node_modules/
          }
}


