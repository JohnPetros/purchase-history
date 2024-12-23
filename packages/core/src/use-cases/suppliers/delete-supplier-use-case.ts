import { NotFoundError } from '../../errors'
import type { ISuppliersRepository } from '../../interfaces/repositories'

export class DeleteSupplierUseCase {
  constructor(private readonly suppliersRepository: ISuppliersRepository) {}

  async execute(supplierId: string) {
    const supplier = await this.suppliersRepository.findById(supplierId)
    if (!supplier) throw new NotFoundError('Supplier does not exist')

    await this.suppliersRepository.remove(supplierId)
  }
}
