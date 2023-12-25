import { GetProductsByNameUseCase } from "../GetProductsByName";
import { ProductEntities } from "../../entities";
import { CatalogRepository } from "../../repositories/CatalogRepository";
import { instance, mock, when } from "ts-mockito";

describe("GetProductsByNameUseCase", () => {
    it("should retrieve products by name successfully", async () => {
        // Arrange
        const mockCatalogRepository = mock<CatalogRepository>();
        const getProductsByNameUseCase = new GetProductsByNameUseCase(
            instance(mockCatalogRepository)
        );

        const productName: string = "Test Product Name";

        const mockProducts: ProductEntities.Product[] = [
            new ProductEntities.Product({id:"1", name:productName, }),
            new ProductEntities.Product({id:"2", name:productName, }),
            // Add more mock products with the same name as needed
        ];

        // Mocking the repository method
        when(mockCatalogRepository.getByName(productName)).thenResolve(mockProducts);

        // Act
        const result = await getProductsByNameUseCase.execute(productName);

        // Assert
        expect(result).toEqual(mockProducts);
    });

    it("should handle error when retrieving products by name fails", async () => {
        // Arrange
        const mockCatalogRepository = mock<CatalogRepository>();
        const getProductsByNameUseCase = new GetProductsByNameUseCase(
            instance(mockCatalogRepository)
        );

        const productName: string = "Test Product Name Error";

        const error: Error = new Error("Failed to retrieve products by name.");

        // Mocking the repository method to throw an error
        when(mockCatalogRepository.getByName(productName)).thenReject(error);

        // Act
        const result = await getProductsByNameUseCase.execute(productName);

        // Assert
        expect(result).toBeInstanceOf(Error);
    });
});
