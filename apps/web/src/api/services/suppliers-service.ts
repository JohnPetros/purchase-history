import type { SupplierDto } from '@purchase-history/core/dtos'
import type { IApiClient, ISuppliersService } from '@purchase-history/core/interfaces'

export const SuppliersService = (apiClient: IApiClient): ISuppliersService => {
  return {
    async listSuppliers() {
      return await apiClient.get<SupplierDto[]>('/suppliers')
    },
  }
}
