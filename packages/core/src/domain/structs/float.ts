import { NotValidError } from '../../errors'

export class Float {
  private constructor(readonly value: number) {}

  static create(value: number, key: string) {
    if (typeof value !== 'number')
      throw new NotValidError(`${key} must be a positive interger`)

    if (value < 0) throw new NotValidError(`${key} must be greater than one`)

    return new Float(value)
  }
}
