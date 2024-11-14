import type { IInvoincesRepository } from '../../interfaces/repositories'

export class ListInvoicesUseCase {
  private constructor(private readonly invoicesRepository: IInvoincesRepository) {}

  async execute(invoiceId: string) {
    const invoice = await this.invoicesRepository.findId(invoiceId)
    return invoice.dto
  }
}
