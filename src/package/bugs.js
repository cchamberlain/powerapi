import name from './name.js'
export default ({ organization = 'noderaider' }) => ({ url: `https://github.com/${organization}/${name}/issues` })
