import { GetAllProductsUseCase } from "../GetAllProducts";
import { Product, } from "../../entities/Product";
import { ProductRepository } from "../../repositories/ProductRepository";
import { instance, mock, when } from "ts-mockito";

describe("GetAllProductsUseCase", () => {
    it("should retrieve all products successfully", async () => {
        // Arrange
        const mockProductRepository = mock<ProductRepository>();
        const getAllProductsUseCase = new GetAllProductsUseCase(instance(mockProductRepository));

        const mockProducts: Product[] = [
            new Product({id:"1", name:"Product 1", description:"Description 1", sku:"SKU1", price:10, onsale:false, categories:{}, attributes:{}}),
            new Product({id:"2", name:"Product 2", description:"Description 2", sku:"SKU2", price:20, onsale:true, categories:{}, attributes:{}}),
            // Add more mock products as needed
        ];

        // Mocking the repository method
        when(mockProductRepository.getAll()).thenResolve(mockProducts);

        // Act
        const result = await getAllProductsUseCase.execute();

        // Assert
        expect(result).toEqual(mockProducts);
    });

    it("should handle error when retrieving products fails", async () => {
        // Arrange
        const mockProductRepository = mock<ProductRepository>();
        const getAllProductsUseCase = new GetAllProductsUseCase(instance(mockProductRepository));

        const error: Error = new Error("Failed to retrieve products.");

        // Mocking the repository method to throw an error
        when(mockProductRepository.getAll()).thenReject(error);

        // Act
        const result = await getAllProductsUseCase.execute();

        // Assert
        expect(result).toBeInstanceOf(Error);
    });
});
