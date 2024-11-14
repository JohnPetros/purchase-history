import type { InvoiceDto } from '../../dtos'
import { Entity } from '../abstracts/entity'
import { Datetime, Integer } from '../structs'
import { Product } from './product'

type InvoiceItem = {
  product: Product
  itemsCount: Integer
}

type InvoiceProps = {
  items: InvoiceItem[]
  sentAt: Datetime
}

export class Invoice extends Entity<InvoiceProps> {
  static create(dto: InvoiceDto) {
    return new Invoice({
      items: dto.items.map(({ product, itemsCount }) => ({
        itemsCount: Integer.create(itemsCount, 'product items count'),
        product: Product.create(product),
      })),
      sentAt: Datetime.create(dto.sentAt, 'sending date must be a integer'),
    })
  }
}
