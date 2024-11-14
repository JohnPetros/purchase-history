import { Product } from "../../domain/entities";
import { ProductDto } from "../../dtos";
import { IProductsRepository } from "../../interfaces/repositories";

export class RegisterProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) { }

  async execute(dto: ProductDto) {
    const existingProductWithCode = await this.productsRepository.findByCode(dto.code)

    if (existingProductWithCode) {
      throw new Error("Product with the same code already exists")
    }

    const product = Product.create(dto)

    await this.productsRepository.add(product)
  }
}