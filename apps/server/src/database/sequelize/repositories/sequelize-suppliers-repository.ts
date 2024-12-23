import { Supplier } from '@purchase-history/core/entities'
import type { ISuppliersRepository } from '@purchase-history/core/interfaces'

import type { SupplierModel } from '../models'
import type { SequelizeSupplier } from '../types'

export class SequelizeSuppliersRepository implements ISuppliersRepository {
  constructor(private readonly supplierModel: typeof SupplierModel) {}

  async findById(supplierId: string): Promise<Supplier | null> {
    const sequelizeSupplier = await this.supplierModel.findByPk(supplierId)

    if (!sequelizeSupplier) return null

    return this.createSupplier(sequelizeSupplier)
  }

  async findByEmail(supplierEmail: string): Promise<Supplier | null> {
    const sequelizeSupplier = await this.supplierModel.findOne({
      where: { email: supplierEmail },
    })

    if (!sequelizeSupplier) return null

    return this.createSupplier(sequelizeSupplier)
  }

  async findByEin(supplierEin: string): Promise<Supplier | null> {
    const sequelizeSupplier = await this.supplierModel.findOne({
      where: { ein: supplierEin },
    })

    if (!sequelizeSupplier) return null

    return this.createSupplier(sequelizeSupplier)
  }

  async findByPhone(supplierPhone: string): Promise<Supplier | null> {
    const sequelizeSupplier = await this.supplierModel.findOne({
      where: { phone: supplierPhone },
    })

    if (!sequelizeSupplier) return null

    return this.createSupplier(sequelizeSupplier)
  }

  async findMany(): Promise<Supplier[]> {
    const sequelizeSuppliers = await this.supplierModel.findAll({
      order: [['createdAt', 'DESC']],
    })

    return sequelizeSuppliers.map(this.createSupplier)
  }

  async update(supplier: Supplier): Promise<void> {
    const supplierDto = supplier.dto
    await this.supplierModel.update(
      {
        name: supplierDto.name,
        email: supplierDto.email,
        ein: supplierDto.ein,
        phone: supplierDto.phone,
      },
      { where: { id: supplier.id } },
    )
  }

  async remove(supplierId: string): Promise<void> {
    await this.supplierModel.destroy({ where: { id: supplierId } })
  }

  async add(supplier: Supplier) {
    await this.supplierModel.create({
      id: supplier.id,
      name: supplier.name.value,
      email: supplier.email.value,
      ein: supplier.ein.value,
      phone: supplier.phone.value,
    })
  }

  private createSupplier(sequelizeSupplier: SequelizeSupplier): Supplier {
    return Supplier.create({
      id: sequelizeSupplier.id,
      name: sequelizeSupplier.name,
      email: sequelizeSupplier.email,
      ein: sequelizeSupplier.ein,
      phone: sequelizeSupplier.phone,
    })
  }
}
