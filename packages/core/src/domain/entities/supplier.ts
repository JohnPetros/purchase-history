import type { SupplierDto } from '../../dtos'
import { Entity } from '../abstracts/entity'
import { Email, Text } from '../structs'

type SupplierProps = {
  name: Text
  email: Text
  ein: Text
  phone: Text
}

export class Supplier extends Entity<SupplierProps> {
  static create(dto: SupplierDto) {
    return new Supplier(
      {
        name: Text.create(dto.name, 'name'),
        email: Email.create(dto.email),
        ein: Text.create(dto.ein, 'ein', true),
        phone: Text.create(dto.phone, 'phone', true),
      },
      dto.id,
    )
  }

  update(dto: Partial<SupplierDto>) {
    return Supplier.create({ ...this.dto, ...dto })
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get ein() {
    return this.props.ein
  }

  get phone() {
    return this.props.phone
  }

  get dto(): SupplierDto {
    return {
      id: this.id,
      name: this.name.value,
      email: this.email.value,
      ein: this.ein.value,
      phone: this.phone.value,
    }
  }
}
