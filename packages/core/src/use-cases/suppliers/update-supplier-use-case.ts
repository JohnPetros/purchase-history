import type { SupplierDto } from '../../dtos'
import type { ISuppliersRepository } from '../../interfaces/repositories'

export class UpdateSupplierUseCase {
  private constructor(private readonly suppliersRepository: ISuppliersRepository) {}

  async execute(dto: Partial<SupplierDto>, id: string) {
    const supplier = await this.suppliersRepository.findById(id)

    if (dto.email) {
      const supplier = await this.suppliersRepository.findByEmail(dto.email)
      if (supplier) throw new Error('E-mail já em uso')
    }

    if (dto.phone) {
      const supplier = await this.suppliersRepository.findByPhone(dto.phone)
      if (supplier) throw new Error('Telefone já em uso')
    }

    const updatedSupplier = supplier.update(dto)
    await this.suppliersRepository.add(updatedSupplier)
  }
}
