import { Integer } from './integer'

export class Price {
  private constructor(readonly value: number) {}

  static create(value: number) {
    const interger = Integer.create(value, 'price')

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
}
