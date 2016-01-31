import 'styles/loading.less'
import Spinner from 'app/controls/spinner'
import { injectElementIntoDOM } from './dom/elements'
import { injectWTFIntoDOM } from './dom/wtf'

injectWTFIntoDOM()
injectElementIntoDOM('loading')
  .then(loading => {
    if(window.powerapi && window.powerapi.app)
      return
    let renderTo = window.document.getElementById('loading-spinner')
    let spinner = new Spinner()
    spinner.spin(renderTo)
  })
  .catch(({ overrideName }) => {})
