import { GetOnSaleProductsUseCase } from "../GetOnSaleProducts";
import { ProductEntities } from "../../entities";
import { CatalogRepository, ProductFilter } from "../../repositories/CatalogRepository";
import { instance, mock, when } from "ts-mockito";

describe("GetOnSaleProductsUseCase", () => {
    it("should retrieve on-sale products successfully", async () => {
        // Arrange
        const mockCatalogRepository = mock<CatalogRepository>();
        const getOnSaleProductsUseCase = new GetOnSaleProductsUseCase(instance(mockCatalogRepository));

        const mockOnSaleProducts: ProductEntities.Product[] = [
            new ProductEntities.Product({id:"1", name:"Product 1", description:"Description 1", sku:"SKU1", price:10, onsale:false, categories:{}, attributes:{}}),
            new ProductEntities.Product({id:"2", name:"Product 2", description:"Description 2", sku:"SKU2", price:20, onsale:true, categories:{}, attributes:{}}),
            // Add more mock on-sale products as needed
        ];

        // Mocking the repository method
        when(mockCatalogRepository.getByOnSale()).thenResolve(mockOnSaleProducts);

        // Act
        const result = await getOnSaleProductsUseCase.execute();

        // Assert
        expect(result).toEqual(mockOnSaleProducts);
    });

    it("should handle error when retrieving on-sale products fails", async () => {
        // Arrange
        const mockCatalogRepository = mock<CatalogRepository>();
        const getOnSaleProductsUseCase = new GetOnSaleProductsUseCase(instance(mockCatalogRepository));

        const error: Error = new Error("Failed to retrieve on-sale products.");

        // Mocking the repository method to throw an error
        when(mockCatalogRepository.getByOnSale()).thenReject(error);

        // Act
        const result = await getOnSaleProductsUseCase.execute();

        // Assert
        expect(result).toBeInstanceOf(Error);
    });
});
