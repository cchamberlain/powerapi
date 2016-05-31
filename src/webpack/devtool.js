import { server } from '../config.js'

export default name => {
  switch(name) {
    case 'server':
      return 'source-map'
  }
  if(process.env.NODE_ENV === 'hot')
    return '#eval'
}
