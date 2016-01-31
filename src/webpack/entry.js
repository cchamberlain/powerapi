import { server, client, baseUrl } from '../config.server'

function maybeHotEntry(name, entry) {
  if(process.env.NODE_ENV === 'hot') {
    let hotEntries = ['webpack-hot-middleware/client']
    if(name === 'shim')
      return entry
      //hotEntries = ['eventsource-polyfill', ...hotEntries]

    return [ entry, ...hotEntries ]
  }
  return entry
}

export function getEntry(name) {
  if(name === 'static')
    return { 'polyfill': '../src/public/static/polyfill.js' }
  return  { 'loading': maybeHotEntry(name, '../src/app/entry/loading')
          , 'app':  maybeHotEntry(name, '../src/app/entry/app')
          }
}
