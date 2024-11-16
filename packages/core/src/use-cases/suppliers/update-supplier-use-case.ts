import type { SupplierDto } from '../../dtos'
import { NotFoundError, NotValidError } from '../../errors'
import type { ISuppliersRepository } from '../../interfaces/repositories'

export class UpdateSupplierUseCase {
  constructor(private readonly suppliersRepository: ISuppliersRepository) {}

  async execute(dto: Partial<SupplierDto>, id: string) {
    const supplier = await this.suppliersRepository.findById(id)

    if (!supplier) throw new NotFoundError('Supplier not found')

    if (dto.email) {
      const supplier = await this.suppliersRepository.findByEmail(dto.email)
      if (supplier) throw new NotValidError('E-mail is already in use')
    }

    if (dto.phone) {
      const supplier = await this.suppliersRepository.findByPhone(dto.phone)
      if (supplier) throw new NotValidError('Phone is already in use')
    }

    const updatedSupplier = supplier.update(dto)
    await this.suppliersRepository.update(updatedSupplier)
  }
}
