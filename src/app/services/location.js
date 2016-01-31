export const protocol = window.location.protocol
export const scheme = window.location.protocol.slice(0, -1)
export const hostname = window.location.hostname
export const port = window.location.port
export const host = window.location.host
export const path = window.location.pathname
export const cleanUrl = `${protocol}//${host}${path}`
export const goToUrl = newUrl => window.history.pushState({ url: newUrl }, null, newUrl)
export const goToPath = newPath => goToUrl(`${protocol}//${host}${newPath}`)
export const goToCleanUrl = () => goToUrl(cleanUrl)
