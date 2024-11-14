import type { ISuppliersRepository } from '../../interfaces/repositories'

export class ListSuppliersUseCase {
  constructor(private readonly suppliersRepository: ISuppliersRepository) {}

  async execute() {
    const suppliers = await this.suppliersRepository.findMany()
    return suppliers.map((supplier) => supplier.dto)
  }
}
