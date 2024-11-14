import { Invoice } from '../../domain/entities/invoice'
import type { InvoiceDto } from '../../dtos'
import type { IInvoincesRepository } from '../../interfaces/repositories'

export class ListInvoicesUseCase {
  private constructor(private readonly invoicesRepository: IInvoincesRepository) {}

  async execute(dto: InvoiceDto) {
    const invoice = Invoice.create(dto)
    await this.invoicesRepository.add(invoice)
  }
}
