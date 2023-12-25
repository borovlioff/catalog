import { ProductEntities } from "../entities";
import { CatalogRepository, PriceFilter } from "../repositories/CatalogRepository";

export class GetProductsByPriceUseCase {
    constructor(private catalogRepository: CatalogRepository) {}

    async execute(priceFilter: PriceFilter): Promise<ProductEntities.Product[] | Error> {
        try {
            const products = await this.catalogRepository.getByPrice(priceFilter);
            return products;
        } catch (error) {
            return new Error("Failed to retrieve products by price.");
        }
    }
}
