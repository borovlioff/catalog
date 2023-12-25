import { GetProductsByDescriptionUseCase } from "../GetProductsByDescription";
import { ProductEntities } from "../../entities";
import { CatalogRepository } from "../../repositories/CatalogRepository";
import { instance, mock, when } from "ts-mockito";

describe("GetProductsByDescriptionUseCase", () => {
    it("should retrieve products by description successfully", async () => {
        // Arrange
        const mockCatalogRepository = mock<CatalogRepository>();
        const getProductsByDescriptionUseCase = new GetProductsByDescriptionUseCase(
            instance(mockCatalogRepository)
        );

        const description: string = "Test Description";

        const mockProducts: ProductEntities.Product[] = [
            new ProductEntities.Product({id:"1", name:"Product 1", description, sku:"SKU1", price:10, onsale:false, categories:{}, attributes:{}}),
            new ProductEntities.Product({id:"2", name:"Product 2", description, sku:"SKU2", price:20, onsale:true, categories:{}, attributes:{}}),
            // Add more mock products with the same description as needed
        ];

        // Mocking the repository method
        when(mockCatalogRepository.getDescription(description)).thenResolve(mockProducts);

        // Act
        const result = await getProductsByDescriptionUseCase.execute(description);

        // Assert
        expect(result).toEqual(mockProducts);
    });

    it("should handle error when retrieving products by description fails", async () => {
        // Arrange
        const mockCatalogRepository = mock<CatalogRepository>();
        const getProductsByDescriptionUseCase = new GetProductsByDescriptionUseCase(
            instance(mockCatalogRepository)
        );

        const description: string = "Test Description Error";

        const error: Error = new Error("Failed to retrieve products by description.");

        // Mocking the repository method to throw an error
        when(mockCatalogRepository.getDescription(description)).thenReject(error);

        // Act
        const result = await getProductsByDescriptionUseCase.execute(description);

        // Assert
        expect(result).toBeInstanceOf(Error);
    });
});
