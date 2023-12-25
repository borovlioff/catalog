import { GetProductsBySKUUseCase } from "../GetProductsBySKU";
import { ProductEntities } from "../../entities";
import { CatalogRepository } from "../../repositories/CatalogRepository";
import { instance, mock, when } from "ts-mockito";

describe("GetProductsBySKUUseCase", () => {
    it("should retrieve products by SKU successfully", async () => {
        // Arrange
        const mockCatalogRepository = mock<CatalogRepository>();
        const getProductsBySKUUseCase = new GetProductsBySKUUseCase(
            instance(mockCatalogRepository)
        );

        const sku: string = "TestSKU";

        const mockProducts: ProductEntities.Product[] = [
            new ProductEntities.Product({id:"1", name:"Test Product 1", sku }),
            new ProductEntities.Product({id:"2", name:"Test Product 2", sku}),
            // Add more mock products with the same SKU as needed
        ];

        // Mocking the repository method
        when(mockCatalogRepository.getBySKU(sku)).thenResolve(mockProducts);

        // Act
        const result = await getProductsBySKUUseCase.execute(sku);

        // Assert
        expect(result).toEqual(mockProducts);
    });

    it("should handle error when retrieving products by SKU fails", async () => {
        // Arrange
        const mockCatalogRepository = mock<CatalogRepository>();
        const getProductsBySKUUseCase = new GetProductsBySKUUseCase(
            instance(mockCatalogRepository)
        );

        const sku: string = "TestSKUError";

        const error: Error = new Error("Failed to retrieve products by SKU.");

        // Mocking the repository method to throw an error
        when(mockCatalogRepository.getBySKU(sku)).thenReject(error);

        // Act
        const result = await getProductsBySKUUseCase.execute(sku);

        // Assert
        expect(result).toBeInstanceOf(Error);
    });
});
