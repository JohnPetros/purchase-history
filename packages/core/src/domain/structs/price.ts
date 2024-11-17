import { Float } from './float'

export class Price {
  private constructor(readonly value: number) {}

  static create(value: number) {
    const interger = Float.create(value, 'price')

    return new Price(interger.value)
  }

  format() {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    return formatter.format(this.value)
  }

  sum(value: number) {
    return new Price(this.value + value)
  }

  multiply(value: number) {
    return new Price(this.value * value)
  }
}
