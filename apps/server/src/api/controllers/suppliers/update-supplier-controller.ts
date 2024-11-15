import type { IHttp } from '@purchase-history/core/interfaces'
import { UpdateSupplierUseCase } from '@purchase-history/core/use-cases'

import { suppliersRepository } from '@database'
import type { SupplierDto } from '@purchase-history/core/dtos'

type RouteParams = {
  supplierId: string
}

type Body = Partial<SupplierDto>

export class UpdateSupplierController {
  async handle(http: IHttp) {
    const { supplierId } = http.getRouteParams<RouteParams>()
    const supplierDto = http.getBody<Body>()
    const useCase = new UpdateSupplierUseCase(suppliersRepository)
    await useCase.execute(supplierDto, supplierId)

    return http.send(null)
  }
}
