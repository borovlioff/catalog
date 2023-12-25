import { Product, ICreatProduct } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";

export class AddProductUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(productData: ICreatProduct): Promise<Product | Error> {
        try {
            const addedProduct = await this.productRepository.add(productData);
            return addedProduct;
        } catch (error) {
            return new Error("Failed to add the product.");
        }
    }
}
