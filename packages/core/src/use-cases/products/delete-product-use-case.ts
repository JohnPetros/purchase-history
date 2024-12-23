import { NotFoundError } from '../../errors'
import type { IProductsRepository } from '../../interfaces/repositories'

export class DeleteProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(productId: string) {
    const product = await this.productsRepository.findById(productId)
    if (!product) throw new NotFoundError('Product does not exist')

    await this.productsRepository.remove(productId)
  }
}
