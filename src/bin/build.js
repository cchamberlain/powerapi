import procmux from 'procmux'
import runAll from 'npm-run-all'

const mux = procmux((state = {}, action = {}) => {
  console.warn('BUILD|REDUCE', state, action)
  switch(action.type) {
    case 'BUILD':
      return { ...state, status: 'BUILDING' }
    case 'CLEAN':
      return { ...state, status: 'CLEANING' }
    case 'BUILD_FINISH':
    case 'CLEAN_FINISH':
      return { ...state, status: 'IDLE' }
  }
  return state
})


const build = () => {
  runAll(['start-hot'])
    .then(() => console.info('BUILD|START-HOT completed'))
  setTimeout(() => {
    const type = 'BUILD_FINISH'
    console.warn(`BUILD|BUILD AT 20 SECONDS, SENDING FINISH SIGNAL '${type}' action`)
    mux.dispatch({ type })
  }, 20000)
}

const clean = () => {
  setTimeout(() => {
    console.warn('CLEAN FINISHED')
    mux.dispatch({ type: 'CLEAN_FINISH' })
  })
}

mux.register('BUILD', build)
mux.initSync(() => build())
console.warn('BUILD EXIT')
