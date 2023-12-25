import { ProductEntities } from "../entities";
import { CatalogRepository } from "../repositories/CatalogRepository";

export class GetProductsBySKUUseCase {
    constructor(private catalogRepository: CatalogRepository) {}

    async execute(sku: string): Promise<ProductEntities.Product[] | Error> {
        try {
            const products = await this.catalogRepository.getBySKU(sku);
            return products;
        } catch (error) {
            return new Error("Failed to retrieve products by SKU.");
        }
    }
}
