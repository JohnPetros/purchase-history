import { NotFoundError } from '../../errors'
import type { ISuppliersRepository } from '../../interfaces/repositories'

export class GetSupplierUseCase {
  constructor(private readonly SuppliersRepository: ISuppliersRepository) {}

  async execute(SupplierId: string) {
    const Supplier = await this.SuppliersRepository.findById(SupplierId)
    if (!Supplier) throw new NotFoundError('Supplier does not exist')

    return Supplier.dto
  }
}
