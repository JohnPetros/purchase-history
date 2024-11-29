import { Op, Sequelize, type Includeable } from 'sequelize'
import { v4 as uuid } from 'uuid'

import type { IInvoicesRepository } from '@purchase-history/core/interfaces'
import type { InvoicesListParams, InvoiceStatus } from '@purchase-history/core/types'
import { Invoice } from '@purchase-history/core/entities'

import type { SequelizeInvoice } from '../types'
import {
  ProductModel,
  CustomerModel,
  InvoiceItemModel,
  type InvoiceModel,
} from '../models'

export class SequelizeInvoicesRepository implements IInvoicesRepository {
  constructor(
    private readonly invoiceModel: typeof InvoiceModel,
    private readonly invoiceItemModel: typeof InvoiceItemModel,
    private readonly customerModel: typeof CustomerModel,
  ) {}

  async updateStatus(invoiceStatus: InvoiceStatus, invoiceId: string): Promise<void> {
    await this.invoiceModel.update(
      { status: invoiceStatus },
      { where: { id: invoiceId } },
    )
  }

  async findById(InvoiceId: string): Promise<Invoice | null> {
    const sequelizeInvoice = await this.invoiceModel.findByPk(InvoiceId, {
      include: [
        {
          model: InvoiceItemModel,
          as: 'items',
          include: ProductModel as unknown as Includeable[],
        },
        {
          model: CustomerModel,
        },
      ],
    })

    if (!sequelizeInvoice) return null

    return this.createInvoice(sequelizeInvoice)
  }

  async findMany({ productId, status }: InvoicesListParams): Promise<Invoice[]> {
    const sequelizeInvoices = await this.invoiceModel.findAll({
      include: [
        {
          model: InvoiceItemModel,
          as: 'items',
          include: ProductModel as unknown as Includeable[],
          where: productId
            ? {
                productId,
              }
            : undefined,
        },
        {
          model: CustomerModel,
        },
      ],
      where: status
        ? {
            status,
          }
        : undefined,
      order: [['createdAt', 'DESC']],
    })

    return sequelizeInvoices.map(this.createInvoice)
  }

  async add(invoice: Invoice) {
    const createdCustomer = await this.customerModel.create({
      name: invoice.customer.name.value,
      email: invoice.customer.email.value,
      city: invoice.customer.address.city.value,
      state: invoice.customer.address.state.value,
      zipcode: invoice.customer.address.zipcode.value,
    })

   const createdInvoice = await this.invoiceModel.create({
      id: invoice.id,
      status: invoice.status,
      customerId: createdCustomer.id,
    })

    for (const item of invoice.items) {
      await this.invoiceItemModel.create({
        id: uuid(),
        invoiceId: invoice.id,
        productId: item.product.id,
        itemsCount: item.itemsCount.value,
      })
    }

    return createdInvoice.number
  }

  private createInvoice(sequelizeInvoice: SequelizeInvoice): Invoice {
    return Invoice.create({
      id: sequelizeInvoice.id,
      status: sequelizeInvoice.status,
      number: sequelizeInvoice.number,
      items: sequelizeInvoice.items.map((item) => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          description: item.product.description,
          code: item.product.code,
          price: Number(item.product.price),
        },
        itemsCount: item.itemsCount,
      })),
      customer: {
        name: sequelizeInvoice.customer.name,
        email: sequelizeInvoice.customer.email,
        address: {
          state: sequelizeInvoice.customer.state,
          city: sequelizeInvoice.customer.city,
          zipcode: sequelizeInvoice.customer.zipcode,
        },
      },
      sentAt: new Date(sequelizeInvoice.createdAt),
    })
  }
}
