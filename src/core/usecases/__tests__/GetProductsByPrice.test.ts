import { GetProductsByPriceUseCase } from "../GetProductsByPrice";
import { ProductEntities } from "../../entities";
import { CatalogRepository, PriceFilter } from "../../repositories/CatalogRepository";
import { instance, mock, when } from "ts-mockito";

describe("GetProductsByPriceUseCase", () => {
    it("should retrieve products by price successfully", async () => {
        // Arrange
        const mockCatalogRepository = mock<CatalogRepository>();
        const getProductsByPriceUseCase = new GetProductsByPriceUseCase(
            instance(mockCatalogRepository)
        );

        const mockPriceFilter: PriceFilter = {
            priceMin: 10,
            priceMax: 50,
        };

        const mockProducts: ProductEntities.Product[] = [
            new ProductEntities.Product({id:"1", name:"Test Product 1", price: 20 }),
            new ProductEntities.Product({id:"2", name:"Test Product 2", price: 30}),
            new ProductEntities.Product({id:"3", name:"Test Product 3", price: 5}),
            // Add more mock products within the price range as needed
        ];

        // Mocking the repository method
        when(mockCatalogRepository.getByPrice(mockPriceFilter)).thenResolve(mockProducts);

        // Act
        const result = await getProductsByPriceUseCase.execute(mockPriceFilter);

        // Assert
        expect(result).toEqual(mockProducts);
    });

    it("should handle error when retrieving products by price fails", async () => {
        // Arrange
        const mockCatalogRepository = mock<CatalogRepository>();
        const getProductsByPriceUseCase = new GetProductsByPriceUseCase(
            instance(mockCatalogRepository)
        );

        const mockPriceFilter: PriceFilter = {
            priceMin: 0,
            priceMax: 100,
        };

        const error: Error = new Error("Failed to retrieve products by price.");

        // Mocking the repository method to throw an error
        when(mockCatalogRepository.getByPrice(mockPriceFilter)).thenReject(error);

        // Act
        const result = await getProductsByPriceUseCase.execute(mockPriceFilter);

        // Assert
        expect(result).toBeInstanceOf(Error);
    });
});
