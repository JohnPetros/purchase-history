import type { IHttp } from '@purchase-history/core/interfaces'
import { ListProductsUseCase } from '@purchase-history/core/use-cases'

import { productsRepository } from '@database'

export class ListProductsController {
  async handle(http: IHttp) {
    const useCase = new ListProductsUseCase(productsRepository)
    const products = await useCase.execute()

    return http.send(products)
  }
}
