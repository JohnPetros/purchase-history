import type { ProductDto } from '../../dtos'
import { Entity } from '../abstracts/entity'
import { Integer, Text } from '../structs'

type ProductProps = {
  name: Text
  description: Text
  price: Integer
}

export class Product extends Entity<ProductProps> {
  static create(dto: ProductDto) {
    return new Product({
      name: Text.create(dto.name, 'name'),
      price: Integer.create(dto.price, 'price'),
      description: Text.create(dto.description, 'description'),
    })
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get price() {
    return this.props.price
  }
}
