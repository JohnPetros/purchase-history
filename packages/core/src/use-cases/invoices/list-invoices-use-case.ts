import type { IInvoicesRepository } from '../../interfaces/repositories'

export class ListInvoicesUseCase {
  constructor(private readonly invoicesRepository: IInvoicesRepository) {}

  async execute() {
    const invoices = await this.invoicesRepository.findMany()
    return invoices.map((invoice) => invoice.dto)
  }
}
