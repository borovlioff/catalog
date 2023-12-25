import { ProductEntities } from "../entities";
import { CatalogRepository, ProductFilter } from "../repositories/CatalogRepository";

export class GetProductsByFilterUseCase {
    constructor(private catalogRepository: CatalogRepository) {}

    async execute(productFilter: ProductFilter): Promise<ProductEntities.Product[] | Error> {
        try {
            const products = await this.catalogRepository.get(productFilter);
            return products;
        } catch (error) {
            return new Error("Failed to retrieve products by filter.");
        }
    }
}
