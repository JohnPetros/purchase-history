import type { IInvoicesRepository } from '../../interfaces/repositories'

type Request = {
  status: string
  productId: string
}

export class ListInvoicesUseCase {
  constructor(private readonly invoicesRepository: IInvoicesRepository) {}

  async execute({ status = '', productId = '' }: Request) {
    const invoices = await this.invoicesRepository.findMany({
      status,
      productId,
    })
    return invoices.map((invoice) => invoice.dto)
  }
}
