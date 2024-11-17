import type { IHttp } from '@purchase-history/core/interfaces'
import { toggleInvoiceStatusUseCase } from '@purchase-history/core/use-cases'

import { invoicesRepository } from '@database'
import { HTTP_STATUS_CODE } from '@constants'

type RouteParams = {
  invoiceId: string
}

export class ToggleInvoiceStatusController {
  async handle(http: IHttp) {
    const { invoiceId } = http.getRouteParams<RouteParams>()
    const useCase = new toggleInvoiceStatusUseCase(invoicesRepository)
    await useCase.execute(invoiceId)

    return http.send(null, HTTP_STATUS_CODE.ok)
  }
}
