import type { IHttp } from '@purchase-history/core/interfaces'
import { ListSuppliersUseCase } from '@purchase-history/core/use-cases'

import { suppliersRepository } from '@database'

export class ListSuppliersController {
  async handle(http: IHttp) {
    const useCase = new ListSuppliersUseCase(suppliersRepository)
    const Suppliers = await useCase.execute()

    return http.send(Suppliers)
  }
}
