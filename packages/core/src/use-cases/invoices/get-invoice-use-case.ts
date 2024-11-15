import type { IInvoicesRepository } from '../../interfaces/repositories'

export class GetInvoicesUseCase {
  constructor(private readonly invoicesRepository: IInvoicesRepository) {}

  async execute(invoiceId: string) {
    const invoice = await this.invoicesRepository.findById(invoiceId)
    if (!invoice) throw new Error('Invoice not found')
    return invoice.dto
  }
}
