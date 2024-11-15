import type { IHttp } from '@purchase-history/core/interfaces'
import { GetProductUseCase } from '@purchase-history/core/use-cases'

import { productsRepository } from '@database'

type RouteParams = {
  productId: string
}

export class GetProductController {
  async handle(http: IHttp) {
    const { productId } = http.getRouteParams<RouteParams>()
    const useCase = new GetProductUseCase(productsRepository)
    const product = await useCase.execute(productId)

    return http.send(product)
  }
}
