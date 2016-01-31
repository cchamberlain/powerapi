'use strict';

Object.defineProperty(exports, "__esModule", {
                  value: true
});
var flags = exports.flags = { dev: true, minify: false };
var bindings = exports.bindings = { node: [{ scheme: 'http', port: 1337 }] };
var cors = exports.cors = { originPatterns: [] };
var fs = exports.fs = { BIN_ROOT: 'bin',
                  LOG_ROOT: 'log'
};
var log = exports.log = { level: 'debug' };
var reportErrors = exports.reportErrors = { email: 'cole.chamberlain@gmail.com' };
var tls = exports.tls = { pfxName: 'powerapi.io.pfx',
                  passphrase: 'selfsigned'
};

exports.default = { flags: flags, bindings: bindings, cors: cors, fs: fs, log: log, reportErrors: reportErrors, tls: tls };
