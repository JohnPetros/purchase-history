export class Datetime {
  private constructor(readonly value: Date) {}

  static create(value?: Date) {
    return new Datetime(value ?? new Date())
  }

  format() {
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    return formatter.format(new Date(this.value))
  }
}
