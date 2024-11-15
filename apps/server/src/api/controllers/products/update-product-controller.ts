import type { IHttp } from '@purchase-history/core/interfaces'
import { UpdadeProductUseCase } from '@purchase-history/core/use-cases'

import type { ProductDto } from '@purchase-history/core/dtos'
import { productsRepository } from '@database'

type RouteParams = {
  productId: string
}

type Body = Partial<ProductDto>

export class UpdateProductController {
  async handle(http: IHttp) {
    const { productId } = http.getRouteParams<RouteParams>()
    const productDto = http.getBody<Body>()
    const useCase = new UpdadeProductUseCase(productsRepository)
    await useCase.execute(productDto, productId)

    return http.send(productDto)
  }
}
