import { Product, ProductId } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";

export class GetProductByIdUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(id: ProductId): Promise<Product | null | Error> {
        try {
            const product = await this.productRepository.getById(id);
            return product;
        } catch (error) {
            return new Error("Failed to retrieve the product by ID.");
        }
    }
}
