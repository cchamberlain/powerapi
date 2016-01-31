import ExtendableError from './ExtendableError'

export default class IdentityError extends ExtendableError {
  constructor(message, innerError) {
    super(message, innerError)
    this.name = 'IdentityError'
  }
}

