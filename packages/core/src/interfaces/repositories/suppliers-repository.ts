import type { Supplier } from '../../domain/entities'

export interface ISuppliersRepository {
  findById(supplierId: string): Promise<Supplier | null>
  findByEmail(supplierEmail: string): Promise<Supplier | null>
  findByEin(supplierEin: string): Promise<Supplier | null>
  findByPhone(supplierPhone: string): Promise<Supplier | null>
  findMany(): Promise<Supplier[]>
  add(supplier: Supplier): Promise<void>
  update(supplier: Supplier): Promise<void>
  remove(supplierId: string): Promise<void>
}
