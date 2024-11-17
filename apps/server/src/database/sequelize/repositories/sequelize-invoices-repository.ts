import type { Includeable } from 'sequelize'

import { Invoice } from '@purchase-history/core/entities'
import type { IInvoicesRepository } from '@purchase-history/core/interfaces'

import type { SequelizeInvoice } from '../types'
import { ProductModel, type InvoiceModel } from '../models'
import { InvoiceItemModel } from '../models/invoice-item-model'
import { CustomerModel } from '../models/customer-model'

export class SequelizeInvoicesRepository implements IInvoicesRepository {
  constructor(
    private readonly invoiceModel: typeof InvoiceModel,
    private readonly invoiceItemModel: typeof InvoiceItemModel,
    private readonly customerModel: typeof CustomerModel,
  ) {}

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

  async findMany(): Promise<Invoice[]> {
    const sequelizeInvoices = await this.invoiceModel.findAll({
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

    await this.invoiceModel.create({
      id: invoice.id,
      status: invoice.status,
      customerId: createdCustomer.id,
    })

    for (const item of invoice.items) {
      await this.invoiceItemModel.create({
        invoiceId: invoice.id,
        productId: item.product.id,
        itemsCount: item.itemsCount.value,
      })
    }
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
