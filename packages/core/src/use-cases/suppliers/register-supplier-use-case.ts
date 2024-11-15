import { Supplier } from '../../domain/entities'
import type { SupplierDto } from '../../dtos'
import type { ISuppliersRepository } from '../../interfaces/repositories'

export class RegisterSupplierUseCase {
  constructor(private readonly suppliersRepository: ISuppliersRepository) {}

  async execute(dto: SupplierDto) {
    const existingSupplierWithSameEmail = await this.suppliersRepository.findByEmail(
      dto.email,
    )
    if (existingSupplierWithSameEmail) throw new Error('E-mail já em uso')

    const existingSupplierWithSamePhone = await this.suppliersRepository.findByPhone(
      dto.phone,
    )
    if (existingSupplierWithSamePhone) throw new Error('Telefone já em uso')

    const supplier = Supplier.create(dto)
    await this.suppliersRepository.add(supplier)
  }
}
