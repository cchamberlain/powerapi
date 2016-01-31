import { readFile } from 'graceful-fs'
import { resolve as resolvePath } from 'path'
import { createLogger } from 'bunyan'
import { assert } from 'chai'
const logger = createLogger({ name: 'tls' })

export const CERTIFICATE_ROOT = resolvePath(__dirname, '..', 'etc', 'certificates')
export const getCertificatePath = filename => resolvePath(CERTIFICATE_ROOT, filename)

export function readCertificate(filename) {
  let certificatePath = getCertificatePath(filename)
  return new Promise((resolve, reject) => {
    readFile(certificatePath, (err, certificate) => {
      if (err)
        return reject(err)
      resolve(certificate)
    })
  })
}

export function readPfx(filename, passphrase) {
  assert.typeOf(passphrase, 'string', 'passphrase must be a string')
  assert.isAbove(passphrase.length, 0, 'passphrase must not be empty')
  return readCertificate(filename).then(pfx => ({ pfx, passphrase }))
}
