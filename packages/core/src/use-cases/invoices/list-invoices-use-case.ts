import type { IInvoicesRepository } from '../../interfaces/repositories'
import { PaginationResponse } from '../../responses'

type Request = {
  status: string
  productId: string
  page: number
}

export class ListInvoicesUseCase {
  constructor(private readonly invoicesRepository: IInvoicesRepository) {}

  async execute({ status = '', productId = '', page = 1 }: Request) {
    const { invoices, count } = await this.invoicesRepository.findMany({
      status,
      productId,
      page,
    })

    return new PaginationResponse({
      items: invoices.map((invoice) => invoice.dto),
      itemsCount: count,
    })
  }
}
