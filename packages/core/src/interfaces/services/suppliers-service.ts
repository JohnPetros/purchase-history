import type { SupplierDto } from '@purchase-history/core/dtos'
import type { ApiResponse } from '@purchase-history/core/responses'

export interface ISuppliersService {
  getSupplier(supplierId: string): Promise<ApiResponse<SupplierDto>>
  listSuppliers(): Promise<ApiResponse<SupplierDto[]>>
  registerSupplier(supplierDto: SupplierDto): Promise<ApiResponse<SupplierDto>>
  updateSupplier(
    supplierDto: Partial<SupplierDto>,
    supplierId: string,
  ): Promise<ApiResponse<SupplierDto>>
  deleteSupplier(supplierId: string): Promise<ApiResponse>
}
