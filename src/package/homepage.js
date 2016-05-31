import name from './name.js'
export default ({ host = 'js.org', organization = 'noderaider' }) => host === 'js.org' ? `http://${name}.js.org` : `http://${organization}.github.io/${name}`
