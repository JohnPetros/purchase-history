import type { IHttp } from '@purchase-history/core/interfaces'
import { SendInvoiceUseCase } from '@purchase-history/core/use-cases'
import type { InvoiceDto } from '@purchase-history/core/dtos'

import { invoicesRepository, productsRepository } from '@database'
import { HTTP_STATUS_CODE } from '@constants'

type Body = {
  invoice: InvoiceDto
  items: Array<{ productId: string; itemsCount: number }>
}

export class SendInvoiceController {
  async handle(http: IHttp) {
    const { invoice, items } = http.getBody<Body>()
    const useCase = new SendInvoiceUseCase(invoicesRepository, productsRepository)
    await useCase.execute(invoice, items)

    return http.send(null, HTTP_STATUS_CODE.created)
  }
}
