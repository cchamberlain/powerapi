import routes from "./routes"
import { stores } from "./stores"
import renderApplication from "./render"

console.dir(routes)

renderApplication(routes, stores, {
  timeout: 600
})
