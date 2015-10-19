import Server from "./Server"

let server = new Server({ prerender: true
                        , separateStylesheet: true
                        , hostname: 'localhost'
                        , port: 8080
                        })
server.start()
