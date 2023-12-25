import { Product, ICreatProduct, ProductId } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";

export class UpdateProductUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(id: ProductId, updatedData: ICreatProduct): Promise<Product | Error> {
        try {
            const updatedProduct = await this.productRepository.update(id, updatedData);
            if (updatedProduct) {
                return updatedProduct;
            } else {
                return new Error("Product not found for update.");
            }
        } catch (error) {
            return new Error("Failed to update the product.");
        }
    }
}
