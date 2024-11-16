import type { SupplierDto } from '@purchase-history/core/dtos'
import type { IApiClient, ISuppliersService } from '@purchase-history/core/interfaces'

export const SuppliersService = (apiClient: IApiClient): ISuppliersService => {
  return {
    async getSupplier(SupplierId) {
      return await apiClient.get<SupplierDto>(`/suppliers/${SupplierId}`)
    },

    async listSuppliers() {
      return await apiClient.get<SupplierDto[]>('/suppliers')
    },

    async registerSupplier(supplierDto) {
      return await apiClient.post<SupplierDto>('/suppliers', supplierDto)
    },

    async updateSupplier(supplierDto, supplierId) {
      return await apiClient.put<SupplierDto>(`/suppliers/${supplierId}`, supplierDto)
    },

    async deleteSupplier(supplierId) {
      return await apiClient.delete(`/suppliers/${supplierId}`)
    },
  }
}
