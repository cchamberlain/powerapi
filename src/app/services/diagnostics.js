const isElementDisposed = name => window.powerapi && window.powerapi[name].isDisposed

/** All the diagnostics. */
export const diagnose = (tryRootCause = false) => {
  let doesPowerapiExist = typeof window.powerapi !== 'undefined'
  let definedNames = new Set(doesPowerapiExist ? Object.keys(window.powerapi) : [])
  let context = { doesPowerapiExist
                , definedNames
                }
  if(doesPowerapiExist) {
    let doesLoadingExist = definedNames.has('loading')
    let doesTimeoutExist = definedNames.has('timeout')
    let doesAppExist = definedNames.has('app')

    Object.assign(context,  { doesLoadingExist
                            , doesTimeoutExist
                            , doesAppExist
                            })

    if(doesLoadingExist) {
      Object.assign(context,  { isLoadingDisposed: isElementDisposed('loading')
                              })
    }
    if(doesTimeoutExist) {
      Object.assign(context,  { isTimeoutDisposed: isElementDisposed('timeout')
                              })
    }
    if(doesAppExist) {
      Object.assign(context,  { isAppDisposed: isElementDisposed('app')
                              })
    }
  }
  return tryRootCause ? rootCause(context) : context
}

export const rootCause = context => {
  return JSON.stringify(context)
}
