import type { SupplierDto } from '@purchase-history/core/dtos'
import type { ApiResponse } from '@purchase-history/core/responses'

export interface ISuppliersService {
  listSuppliers(): Promise<ApiResponse<SupplierDto[]>>
}
