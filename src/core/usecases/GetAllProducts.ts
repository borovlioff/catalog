import { Product} from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";

export class GetAllProductsUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(): Promise<Product[] | Error> {
        try {
            const allProducts = await this.productRepository.getAll();
            return allProducts;
        } catch (error) {
            return new Error("Failed to retrieve products.");
        }
    }
}
