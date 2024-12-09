import type { IHttp } from '@purchase-history/core/interfaces'
import { ListInvoicesUseCase } from '@purchase-history/core/use-cases'

import { invoicesRepository } from '@database'

type QueryParams = {
  status: string
  productId: string
  page: number
}

export class ListInvoicesController {
  async handle(http: IHttp) {
    const { status, productId, page } = http.getQueryParams<QueryParams>()
    const useCase = new ListInvoicesUseCase(invoicesRepository)
    const invoices = await useCase.execute({ status, productId, page })

    http.setHeader('X-Pagination', 'true')

    return http.send(invoices)
  }
}
