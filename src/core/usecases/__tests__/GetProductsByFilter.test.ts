import { GetProductsByFilterUseCase } from "../GetProductsByFilter";
import { ProductEntities } from "../../entities";
import { CatalogRepository, ProductFilter } from "../../repositories/CatalogRepository";
import { instance, mock, when } from "ts-mockito";

describe("GetProductsByFilterUseCase", () => {
    it("should retrieve products by filter successfully", async () => {
        // Arrange
        const mockCatalogRepository = mock<CatalogRepository>();
        const getProductsByFilterUseCase = new GetProductsByFilterUseCase(
            instance(mockCatalogRepository)
        );

        const mockProductFilter: ProductFilter = {
            name: "Test Product",
            description: "Test Description",
            sku: "TestSKU",
            priceMin: 10,
            priceMax: 50,
            onSale: true,
            // Add more filter criteria as needed
        };

        const mockProducts: ProductEntities.Product[] = [
            new ProductEntities.Product({id:"1", name:"Test Product 1", description:"Test Description", sku:"TestSKU", price:20, onsale:true, categories:{}, attributes:{}}),
            new ProductEntities.Product({id:"2", name:"Test Product 2", description:"Test Description", sku:"TestSKU", price:30, onsale:true, categories:{}, attributes:{}}),
            // Add more mock products that match the filter criteria
        ];

        // Mocking the repository method
        when(mockCatalogRepository.get(mockProductFilter)).thenResolve(mockProducts);

        // Act
        const result = await getProductsByFilterUseCase.execute(mockProductFilter);

        // Assert
        expect(result).toEqual(mockProducts);
    });

    it("should handle error when retrieving products by filter fails", async () => {
        // Arrange
        const mockCatalogRepository = mock<CatalogRepository>();
        const getProductsByFilterUseCase = new GetProductsByFilterUseCase(
            instance(mockCatalogRepository)
        );

        const mockProductFilter: ProductFilter = {
            name: "Test Product Error",
            description: "Test Description Error",
            sku: "TestSKUError",
            priceMin: 0,
            priceMax: 100,
            onSale: false,
            // Add more filter criteria as needed
        };

        const error: Error = new Error("Failed to retrieve products by filter.");

        // Mocking the repository method to throw an error
        when(mockCatalogRepository.get(mockProductFilter)).thenReject(error);

        // Act
        const result = await getProductsByFilterUseCase.execute(mockProductFilter);

        // Assert
        expect(result).toBeInstanceOf(Error);
    });
});
