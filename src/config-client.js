export const hostname = 'powerapi'
export const port = 1337
export const dom =  { idMap:  { app: 'app-root'
                              , loading: 'loading-root'
                              }
                    , disposalMap:  { app: [ 'loading' ]
                                    , timeout: [ 'loading' ]
                                    }
                    , innerHTMLMap: { loading: '<div id=\"loading-container\"><div id=\"loading-spinner\" /></div>' }
                    }
export const state =  { meta: { tokens: { persist:  { type: 'cookie'
                                                    , name: 'powerapi-tokens'
                                                    , days: 14
                                                    }
                                        , propTypes:  { access: 'string'
                                                      , refresh: 'string'
                                                      }
                                        , concatProps: ':'
                                        , jsonProps: false
                                        , base64Props: true
                                        }
                              , fingerprint:  { persist:  { type: 'cookie'
                                                          , name: 'powerapi-fingerprint'
                                                          , days: 365
                                                          }
                                              , propTypes: 'string'
                                              , jsonProps: false
                                              , base64Props: true
                                              }
                              }
                      }
export const log = { name: 'powerapi', level: 'debug'}

export default { hostname, port, dom, state, log }
