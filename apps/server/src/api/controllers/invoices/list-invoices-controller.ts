import type { IHttp } from '@purchase-history/core/interfaces'
import { ListInvoicesUseCase } from '@purchase-history/core/use-cases'

import { invoicesRepository } from '@database'

export class ListInvoicesController {
  async handle(http: IHttp) {
    const useCase = new ListInvoicesUseCase(invoicesRepository)
    const invoices = await useCase.execute()

    return http.send(invoices)
  }
}
