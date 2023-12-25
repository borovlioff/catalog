import { ProductEntities } from "../entities";
import { CatalogRepository } from "../repositories/CatalogRepository";

export class GetProductsByDescriptionUseCase {
    constructor(private catalogRepository: CatalogRepository) {}

    async execute(description: string): Promise<ProductEntities.Product[] | Error> {
        try {
            const products = await this.catalogRepository.getDescription(description);
            return products;
        } catch (error) {
            return new Error("Failed to retrieve products by description.");
        }
    }
}
