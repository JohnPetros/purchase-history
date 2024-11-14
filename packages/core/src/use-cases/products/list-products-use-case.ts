import type { IProductsRepository } from '../../interfaces/repositories'

export class ListProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute() {
    const products = await this.productsRepository.findMany()
    return products.map((product) => product.dto)
  }
}
