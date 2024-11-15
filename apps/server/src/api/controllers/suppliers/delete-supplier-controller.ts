import type { IHttp } from '@purchase-history/core/interfaces'
import { DeleteSupplierUseCase } from '@purchase-history/core/use-cases'

import { suppliersRepository } from '@database'

type RouteParams = {
  supplierId: string
}

export class DeleteSupplierController {
  async handle(http: IHttp) {
    const { supplierId } = http.getRouteParams<RouteParams>()
    const useCase = new DeleteSupplierUseCase(suppliersRepository)
    await useCase.execute(supplierId)

    return http.send(null)
  }
}
