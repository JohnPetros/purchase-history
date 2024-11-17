import { NotFoundError } from '../../errors'
import type { IInvoicesRepository } from '../../interfaces/repositories'

export class toggleInvoiceStatusUseCase {
  constructor(private readonly invoicesRepository: IInvoicesRepository) {}

  async execute(invoiceId: string) {
    const invoice = await this.invoicesRepository.findById(invoiceId)
    if (!invoice) throw new NotFoundError('Invoice not found')

    invoice.toggleStatus()

    await this.invoicesRepository.updateStatus(invoice.status, invoiceId)
  }
}
