import Server from "./Server"

let server = new Server({ hostname: 'localhost'
                        , port: 8080
                        })
server.start()
