import type { IHttp } from '@purchase-history/core/interfaces'
import { DeleteProductUseCase } from '@purchase-history/core/use-cases'

import { productsRepository, suppliersRepository } from '@database'

type RouteParams = {
  productId: string
}

export class DeleteProductController {
  async handle(http: IHttp) {
    const { productId } = http.getRouteParams<RouteParams>()
    const useCase = new DeleteProductUseCase(productsRepository)
    await useCase.execute(productId)

    return http.send(null)
  }
}
