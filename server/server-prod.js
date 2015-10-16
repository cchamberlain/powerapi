require('babel/register')
require('./server')({ prerender: true
                    , separateStylesheet: true
                    , hostname: 'localhost'
                    , port: 8080
                    })
