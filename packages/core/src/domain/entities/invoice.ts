import type { InvoiceDto, InvoiceItemDto } from '../../dtos'
import type { InvoiceStatus } from '../../types'
import { Entity } from '../abstracts/entity'
import { Datetime, Integer } from '../structs'
import { Product } from './product'

type InvoiceItem = {
  product: Product
  itemsCount: Integer
}

type InvoiceProps = {
  items: InvoiceItem[]
  status: InvoiceStatus
  sentAt: Datetime
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
        sentAt: Datetime.create(dto.sentAt, 'sending date'),
      },
      dto.id,
    )
  }

  addItem(item: InvoiceItem) {
    this.props.items.push(item)
  }

  get status() {
    return this.props.status
  }

  get items(): InvoiceItem[] {
    return this.props.items
  }

  get sentAt() {
    return this.props.sentAt
  }

  get dto(): InvoiceDto {
    return {
      id: this.id,
      status: this.status,
      items: this.items.map((item) => ({
        product: item.product.dto,
        itemsCount: item.itemsCount.value,
      })),
      sentAt: this.sentAt.value,
    }
  }
}
