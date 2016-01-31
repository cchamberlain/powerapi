'use strict';

Object.defineProperty(exports, "__esModule", {
                value: true
});
var hostname = exports.hostname = 'powerapi';
var port = exports.port = 1337;
var dom = exports.dom = { idMap: { app: 'app-root',
                                loading: 'loading-root'
                },
                disposalMap: { app: ['loading'],
                                timeout: ['loading']
                },
                innerHTMLMap: { loading: '<div id=\"loading-container\"><div id=\"loading-spinner\" /></div>' }
};
var state = exports.state = { meta: { tokens: { persist: { type: 'cookie',
                                                                name: 'powerapi-tokens',
                                                                days: 14
                                                },
                                                propTypes: { access: 'string',
                                                                refresh: 'string'
                                                },
                                                concatProps: ':',
                                                jsonProps: false,
                                                base64Props: true
                                },
                                fingerprint: { persist: { type: 'cookie',
                                                                name: 'powerapi-fingerprint',
                                                                days: 365
                                                },
                                                propTypes: 'string',
                                                jsonProps: false,
                                                base64Props: true
                                }
                }
};
var log = exports.log = { name: 'powerapi', level: 'debug' };

exports.default = { hostname: hostname, port: port, dom: dom, state: state, log: log };
