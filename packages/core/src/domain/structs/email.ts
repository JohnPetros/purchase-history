import { NotValidError } from '../../errors'
import { Text } from './text'

export class Email {
  private static readonly EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  private constructor(readonly value: string) {}

  static create(value: string) {
    if (!Email.EMAIL_REGEX.test(Text.create(value, 'email').value)) {
      throw new NotValidError(`${value} must be a valid email address`)
    }

    return new Email(value)
  }
}
