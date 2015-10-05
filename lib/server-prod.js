require('babel/register')
require("./server")({ prerender: true
                    , separateStylesheet: true
                    , port: 8080
                    })
