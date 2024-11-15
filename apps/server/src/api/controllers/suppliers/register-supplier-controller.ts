import type { SupplierDto } from '@purchase-history/core/dtos'
import type { IHttp } from '@purchase-history/core/interfaces'
import { RegisterSupplierUseCase } from '@purchase-history/core/use-cases'

import { suppliersRepository } from '@database'

export class RegisterSupplierController {
  async handle(http: IHttp) {
    const supplierDto = http.getBody<SupplierDto>()
    const useCase = new RegisterSupplierUseCase(suppliersRepository)
    await useCase.execute(supplierDto)

    return http.send(supplierDto)
  }
}
