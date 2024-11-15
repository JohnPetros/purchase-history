import { Product } from '../../domain/entities'
import type { ProductDto } from '../../dtos'
import type {
  IProductsRepository,
  ISuppliersRepository,
} from '../../interfaces/repositories'

export class RegisterProductUseCase {
  constructor(
    private readonly productsRepository: IProductsRepository,
    private readonly suppliersRepository: ISuppliersRepository,
  ) {}

  async execute(productDto: ProductDto, supplierId: string) {
    const existingProductWithCode = await this.productsRepository.findByCode(
      productDto.code,
    )

    if (existingProductWithCode) {
      throw new Error('Product with the same code already exists')
    }

    const supplier = await this.suppliersRepository.findById(supplierId)

    if (!supplier) {
      throw new Error('Supplier not found')
    }

    const product = Product.create(productDto)
    product.supplier = supplier

    await this.productsRepository.add(product)
    return product.dto
  }
}
