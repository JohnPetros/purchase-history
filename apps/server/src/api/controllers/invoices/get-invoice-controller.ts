import type { IHttp } from '@purchase-history/core/interfaces'
import { GetInvoicesUseCase } from '@purchase-history/core/use-cases'

import { invoicesRepository, productsRepository } from '@database'

type RouteParams = {
  productId: string
}

export class GetInvoiceController {
  async handle(http: IHttp) {
    const { productId } = http.getRouteParams<RouteParams>()
    const useCase = new GetInvoicesUseCase(invoicesRepository)
    const product = await useCase.execute(productId)

    return http.send(product)
  }
}
