import type { InvoiceDto } from '../../dtos'
import type { InvoiceStatus } from '../../types'
import { Entity } from '../abstracts/entity'
import { Datetime, Email, Integer, Price, Text } from '../structs'
import { Product } from './product'

type InvoiceItem = {
  product: Product
  itemsCount: Integer
}

type InvoiceCustomer = {
  name: Text
  email: Text
  address: {
    zipcode: Text
    city: Text
    state: Text
  }
}

type InvoiceProps = {
  items: InvoiceItem[]
  status: InvoiceStatus
  number: Integer
  sentAt: Datetime
  customer: InvoiceCustomer
}

export class Invoice extends Entity<InvoiceProps> {
  static create(dto: InvoiceDto) {
    let items: InvoiceItem[] = []

    if (dto.items) {
      items = dto.items.map(({ product, itemsCount }) => {
        return {
          itemsCount: Integer.create(itemsCount, 'product items count'),
          product: Product.create(product),
        }
      })
    }

    return new Invoice(
      {
        items,
        status: dto.status ?? 'pending',
        sentAt: Datetime.create(dto.sentAt),
        number: Integer.create(dto.number ?? 1, 'number'),
        customer: {
          name: Text.create(dto.customer.name, 'customer name'),
          email: Email.create(dto.customer.email),
          address: {
            city: Text.create(dto.customer.address.city, 'city name'),
            state: Text.create(dto.customer.address.state, 'state name'),
            zipcode: Text.create(dto.customer.address.zipcode, 'zipcode'),
          },
        },
      },
      dto.id,
    )
  }

  addItem(item: InvoiceItem) {
    this.props.items.push(item)
  }

  toggleStatus() {
    this.props.status = this.status === 'paid' ? 'pending' : 'paid'
  }

  get amount() {
    const value = this.items.reduce(
      (total, item) => item.product.price.value * item.itemsCount.value + total,
      0,
    )

    return Price.create(value)
  }

  get status() {
    return this.props.status
  }

  get items(): InvoiceItem[] {
    return this.props.items
  }

  get number() {
    return this.props.number
  }

  get sentAt() {
    return this.props.sentAt
  }

  get customer() {
    return this.props.customer
  }

  get dto(): InvoiceDto {
    return {
      id: this.id,
      status: this.status,
      number: this.number.value,
      items: this.items.map((item) => ({
        product: item.product.dto,
        itemsCount: item.itemsCount.value,
      })),
      sentAt: this.sentAt.value,
      customer: {
        name: this.customer.name.value,
        email: this.customer.email.value,
        address: {
          city: this.customer.address.city.value,
          state: this.customer.address.state.value,
          zipcode: this.customer.address.zipcode.value,
        },
      },
    }
  }
}
