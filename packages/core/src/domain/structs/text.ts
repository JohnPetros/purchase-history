import { NotValidError } from '../../errors'

export class Text {
  private static readonly NUMERIC_REGEX = /^[/0-9.-]*$/
  private constructor(readonly value: string) {}

  static create(value: string, key: string, isNumeric = false) {
    if (typeof value !== 'string') throw new NotValidError(`${key} value must be a text`)

    if (isNumeric && !Text.NUMERIC_REGEX.test(value)) {
      throw new NotValidError(`${key} value must be a numeric value`)
    }

    return new Text(value)
  }
}
