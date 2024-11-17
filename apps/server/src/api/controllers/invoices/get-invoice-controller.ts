import type { IHttp } from '@purchase-history/core/interfaces'
import { GetInvoicesUseCase } from '@purchase-history/core/use-cases'

import { invoicesRepository } from '@database'

type RouteParams = {
  invoiceId: string
}

export class GetInvoiceController {
  async handle(http: IHttp) {
    const { invoiceId } = http.getRouteParams<RouteParams>()
    const useCase = new GetInvoicesUseCase(invoicesRepository)
    const product = await useCase.execute(invoiceId)

    return http.send(product)
  }
}
