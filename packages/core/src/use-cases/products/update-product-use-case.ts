import type { ProductDto } from '../../dtos'
import type {
  IProductsRepository,
  ISuppliersRepository,
} from '../../interfaces/repositories'

export class UpdadeProductUseCase {
  constructor(
    private readonly productsRepository: IProductsRepository,
    private readonly suppliersRepository: ISuppliersRepository,
  ) {}

  async execute(dto: Partial<ProductDto>, productId: string, supplierId: string) {
    console.log('dto', dto)

    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new Error('Product does not exist')
    }

    if (dto.code) {
      const product = await this.productsRepository.findByCode(dto.code)

      if (product) {
        throw new Error('Product with the same code already exists')
      }
    }

    const supplier = await this.suppliersRepository.findById(supplierId)

    if (!supplier) {
      throw new Error('Supplier does not exist')
    }

    product.supplier = supplier

    const updatedProduct = product.update(dto)
    await this.productsRepository.update(updatedProduct)

    return updatedProduct.dto
  }
}
