import type { InvoiceDto } from '../../dtos'
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
    return new Invoice({
      items: dto.items.map(({ product, itemsCount }) => ({
        itemsCount: Integer.create(itemsCount, 'product items count'),
        product: Product.create(product),
      })),
      status: dto.invoiceStatus,
      sentAt: Datetime.create(dto.sentAt, 'sending date must be a integer'),
    })
  }

  get status() {
    return this.props.status
  }

  get items() {
    return this.props.items
  }

  get sentAt() {
    return this.props.sentAt
  }

  get dto(): InvoiceDto {
    return {
      id: this.id,
      invoiceStatus: this.status,
      items: this.items.map((item) => ({
        product: item.product.dto,
        itemsCount: item.itemsCount.value,
      })),
      sentAt: this.sentAt.value,
    }
  }
}
