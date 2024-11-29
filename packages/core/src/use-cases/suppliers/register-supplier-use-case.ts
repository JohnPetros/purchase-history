import { Supplier } from '../../domain/entities'
import type { SupplierDto } from '../../dtos'
import { NotValidError } from '../../errors'
import type { ISuppliersRepository } from '../../interfaces/repositories'

export class RegisterSupplierUseCase {
  constructor(private readonly suppliersRepository: ISuppliersRepository) {}

  async execute(dto: SupplierDto) {
    const supplier = Supplier.create(dto)

    const existingSupplierWithSameEmail = await this.suppliersRepository.findByEmail(
      supplier.email.value,
    )
    if (existingSupplierWithSameEmail) throw new NotValidError('E-mail already in use')

    const existingSupplierWithSameEin = await this.suppliersRepository.findByEin(
        supplier.ein.value,
    )
    if (existingSupplierWithSameEin) throw new NotValidError('EIN already in use')

    const existingSupplierWithSamePhone = await this.suppliersRepository.findByPhone(
      supplier.phone.value,
    )
    if (existingSupplierWithSamePhone) throw new NotValidError('Telefone already in use')

    await this.suppliersRepository.add(supplier)
    return supplier.dto
  }
}
