export class Integer {
  private constructor(readonly value: number) {}

  static create(value: number, key: string) {
    if (typeof value !== 'number') throw Error(`${key} must be a positive interger`)

    if (value < 0) throw Error(`${key} must be greater than one`)

    return new Integer(value)
  }
}
