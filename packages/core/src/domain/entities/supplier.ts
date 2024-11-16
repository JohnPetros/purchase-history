import type { SupplierDto } from '../../dtos'
import { Entity } from '../abstracts/entity'
import { Email, Text } from '../structs'

type SupplierProps = {
  name: Text
  email: Text
  cnpj: Text
  phone: Text
}

export class Supplier extends Entity<SupplierProps> {
  static create(dto: SupplierDto) {
    return new Supplier(
      {
        name: Text.create(dto.name, 'name'),
        email: Email.create(dto.email),
        cnpj: Text.create(dto.cnpj, 'ein', true),
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

  get cnpj() {
    return this.props.cnpj
  }

  get phone() {
    return this.props.phone
  }

  get dto(): SupplierDto {
    return {
      id: this.id,
      name: this.name.value,
      email: this.email.value,
      cnpj: this.cnpj.value,
      phone: this.phone.value,
    }
  }
}
