import { ProductId } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";

export class DeleteProductUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(id: ProductId): Promise<boolean | Error> {
        try {
            const isDeleted = await this.productRepository.delete(id);
            return isDeleted;
        } catch (error) {
            return new Error("Failed to delete the product.");
        }
    }
}
