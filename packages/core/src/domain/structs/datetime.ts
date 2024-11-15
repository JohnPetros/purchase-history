export class Datetime {
  private constructor(readonly value: Date) {}

  static create(value?: Date, key?: string) {
    if (value && !(value instanceof Date)) throw Error(`${key} must be datetime`)

    return new Datetime(value ?? new Date())
  }
}
