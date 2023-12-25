import { ProductEntities } from "../entities";
import { CatalogRepository } from "../repositories/CatalogRepository";

export class GetOnSaleProductsUseCase {
    constructor(private catalogRepository: CatalogRepository) {}

    async execute(): Promise<ProductEntities.Product[] | Error> {
        try {
            const products = await this.catalogRepository.getByOnSale();
            return products;
        } catch (error) {
            return new Error("Failed to retrieve on-sale products.");
        }
    }
}
