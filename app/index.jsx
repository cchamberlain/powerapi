import routes from "./routes"
import { stores } from "./stores"
console.dir(stores)
import renderApplication from "./render"

renderApplication(routes, stores, {
  timeout: 600
})
