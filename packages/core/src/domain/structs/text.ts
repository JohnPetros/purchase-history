export class Text {
  private constructor(readonly value: string) {}

  static create(value: string, key: string) {
    if (typeof value !== 'string') throw Error(`${key} value must be a text`)

    return new Text(value)
  }
}
