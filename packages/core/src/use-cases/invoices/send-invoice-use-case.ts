import { Invoice } from '../../domain/entities/invoice'
import { Integer } from '../../domain/structs'
import type { InvoiceDto } from '../../dtos'
import { NotValidError } from '../../errors'
import type {
  IInvoicesRepository,
  IProductsRepository,
} from '../../interfaces/repositories'

type Item = {
  productId: string
  itemsCount: number
}

export class SendInvoiceUseCase {
  constructor(
    private readonly invoicesRepository: IInvoicesRepository,
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(dto: InvoiceDto, items: Item[]) {
    if (!items.length) {
      throw new NotValidError('The count of items must be greater than zero')
    }

    const invoice = Invoice.create(dto)

    for (const item of items) {
      const product = await this.productsRepository.findById(item.productId)
      if (!product) throw new Error('Product not found')

      invoice.addItem({
        product,
        itemsCount: Integer.create(item.itemsCount, 'items count'),
      })
    }

    const invoiceNumber = await this.invoicesRepository.add(invoice)
    invoice.number = invoiceNumber
    return invoice.dto
  }
}
