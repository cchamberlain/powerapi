export const flags = { dev: true, minify: false }
export const bindings = { node: [ { scheme: 'http', port: 1337 } ] }
export const cors = { originPatterns: [] }
export const fs = { BIN_ROOT: 'bin'
                  , LOG_ROOT: 'log'
                  }
export const log = { level: 'debug' }
export const reportErrors = { email: 'cole.chamberlain@gmail.com' }
export const tls =  { pfxName: 'powerapi.io.pfx'
                    , passphrase: 'selfsigned'
                    }

export default { flags, bindings, cors, fs, log, reportErrors, tls }
