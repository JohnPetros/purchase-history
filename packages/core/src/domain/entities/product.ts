import type { ProductDto } from '../../dtos'
import { Entity } from '../abstracts/entity'
import { Integer, Text } from '../structs'
import { Supplier } from './supplier'

type ProductProps = {
  name: Text
  description: Text
  code: Text
  price: Integer
  supplier: Supplier | null
}

export class Product extends Entity<ProductProps> {
  static create(dto: ProductDto) {
    return new Product(
      {
        name: Text.create(dto.name, 'name'),
        price: Integer.create(dto.price, 'price'),
        code: Text.create(dto.code, 'code'),
        description: Text.create(dto.description, 'description'),
        supplier: dto.supplier ? Supplier.create(dto.supplier) : null,
      },
      dto.id,
    )
  }

  set supplier(supplier: Supplier) {
    this.props.supplier = supplier
  }

  update(dto: Partial<ProductDto>) {
    return Product.create({ ...this.dto, ...dto })
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

  get code() {
    return this.props.code
  }

  get supplier(): Supplier | null {
    return this.props.supplier
  }

  get dto(): ProductDto {
    return {
      id: this.id,
      name: this.name.value,
      description: this.description.value,
      code: this.code.value,
      price: this.price.value,
      supplier: this.supplier?.dto ?? undefined,
    }
  }
}
