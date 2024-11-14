import type { Supplier } from '../../domain/entities'

export interface ISuppliersRepository {
  findById(supplierId: string): Promise<Supplier>
  findByEmail(supplierEmail: string): Promise<Supplier>
  findByPhone(supplierPhone: string): Promise<Supplier>
  findMany(): Promise<Supplier[]>
  add(supplier: Supplier): Promise<void>
  update(supplier: Supplier): Promise<void>
  remove(supplierId: string): Promise<void>
}
