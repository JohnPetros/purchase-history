import type { IHttp } from '@purchase-history/core/interfaces'
import { GetSupplierUseCase } from '@purchase-history/core/use-cases'

import { suppliersRepository } from '@database'

type RouteParams = {
  supplierId: string
}

export class GetsupplierController {
  async handle(http: IHttp) {
    const { supplierId } = http.getRouteParams<RouteParams>()
    const useCase = new GetSupplierUseCase(suppliersRepository)
    const supplier = await useCase.execute(supplierId)

    return http.send(supplier)
  }
}
