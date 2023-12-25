import { ProductEntities } from "../entities";
import { CatalogRepository } from "../repositories/CatalogRepository";

export class GetProductsByNameUseCase {
    constructor(private catalogRepository: CatalogRepository) {}

    async execute(name: string): Promise<ProductEntities.Product[] | Error> {
        try {
            const products = await this.catalogRepository.getByName(name);
            return products;
        } catch (error) {
            return new Error("Failed to retrieve products by name.");
        }
    }
}
