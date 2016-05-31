import name from './name.js'
export default ({ organization = 'noderaider' }) => ( { type: 'git'
                                                      , url: `git+https://github.com/${organization}/${name}.git`
                                                      } )
