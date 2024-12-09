import type { InvoiceDto } from '@purchase-history/core/dtos'
import type { ApiResponse, PaginationResponse } from '@purchase-history/core/responses'
import type { InvoicesListParams } from '../../types'

type InvoiceItem = {
  productId: string
  itemsCount: number
}

export interface IInvoicesService {
  getInvoice(invoiceId: string): Promise<ApiResponse<InvoiceDto>>
  listInvoices(
    params: InvoicesListParams,
  ): Promise<ApiResponse<PaginationResponse<InvoiceDto>>>
  sendInvoice(
    invoiceDto: InvoiceDto,
    invoiceItems: InvoiceItem[],
  ): Promise<ApiResponse<InvoiceDto>>
  toggleInvoiceStatus(invoiceId: string): Promise<ApiResponse>
}
