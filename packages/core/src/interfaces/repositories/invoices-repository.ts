import type { Invoice } from '../../domain/entities/invoice'

export interface IInvoincesRepository {
  findMany(): Promise<Invoice[]>
  add(invoice: Invoice): Promise<void>
}
