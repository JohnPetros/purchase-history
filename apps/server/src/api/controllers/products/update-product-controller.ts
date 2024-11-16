import type { IHttp } from '@purchase-history/core/interfaces'
import { UpdadeProductUseCase } from '@purchase-history/core/use-cases'

import type { ProductDto } from '@purchase-history/core/dtos'
import { productsRepository, suppliersRepository } from '@database'

type RouteParams = {
  productId: string
}

type Body = {
  product: Partial<ProductDto>
  supplierId: string
}

export class UpdateProductController {
  async handle(http: IHttp) {
    const { productId } = http.getRouteParams<RouteParams>()
    const { product, supplierId } = http.getBody<Body>()
    const useCase = new UpdadeProductUseCase(productsRepository, suppliersRepository)
    const updatedProduct = await useCase.execute(product, productId, supplierId)

    return http.send(updatedProduct)
  }
}
