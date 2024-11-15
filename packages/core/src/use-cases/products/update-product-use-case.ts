import type { ProductDto } from '../../dtos'
import type { IProductsRepository } from '../../interfaces/repositories'

export class UpdadeProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(dto: Partial<ProductDto>, id: string) {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new Error('Product with the same code already exists')
    }

    if (dto.code) {
      const existingProductWithCode = await this.productsRepository.findByCode(dto.code)

      if (existingProductWithCode) {
        throw new Error('Product with the same code already exists')
      }
    }

    const updatedProduct = product.update(dto)
    await this.productsRepository.update(updatedProduct)
  }
}
