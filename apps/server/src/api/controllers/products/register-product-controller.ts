import type { ProductDto } from '@purchase-history/core/dtos'
import type { IHttp } from '@purchase-history/core/interfaces'
import { RegisterProductUseCase } from '@purchase-history/core/use-cases'

import { productsRepository, suppliersRepository } from '@database'
import { HTTP_STATUS_CODE } from '@constants'

type Body = {
  product: ProductDto
  supplierId: string
}

export class RegisterProductController {
  async handle(http: IHttp) {
    const { product, supplierId } = http.getBody<Body>()
    const useCase = new RegisterProductUseCase(productsRepository, suppliersRepository)
    const registeredProduct = await useCase.execute(product, supplierId)

    return http.send(registeredProduct, HTTP_STATUS_CODE.created)
  }
}
