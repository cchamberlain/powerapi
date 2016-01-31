
export const chainLog = (fn, ...args) =>  { console.log(args)
                                            return fn()
                                          }
