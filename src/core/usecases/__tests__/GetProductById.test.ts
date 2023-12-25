import { GetProductByIdUseCase } from "../GetProductById";
import { Product, ProductId } from "../../entities/Product";
import { ProductRepository } from "../../repositories/ProductRepository";
import { instance, mock, when } from "ts-mockito";

describe("GetProductByIdUseCase", () => {
    it("should retrieve product by ID successfully", async () => {
        // Arrange
        const mockProductRepository = mock<ProductRepository>();
        const getProductByIdUseCase = new GetProductByIdUseCase(instance(mockProductRepository));

        const productId: ProductId = "123"; // Replace with a valid product ID

        const mockProduct: Product | null = new Product({id:"123", name:"Test Product" });

        // Mocking the repository method
        when(mockProductRepository.getById(productId)).thenResolve(mockProduct);

        // Act
        const result = await getProductByIdUseCase.execute(productId);

        // Assert
        expect(result).toEqual(mockProduct);
    });

    it("should handle error when retrieving product by ID fails", async () => {
        // Arrange
        const mockProductRepository = mock<ProductRepository>();
        const getProductByIdUseCase = new GetProductByIdUseCase(instance(mockProductRepository));

        const productId: ProductId = "456"; // Replace with a valid product ID

        const error: Error = new Error("Failed to retrieve the product by ID.");

        // Mocking the repository method to throw an error
        when(mockProductRepository.getById(productId)).thenReject(error);

        // Act
        const result = await getProductByIdUseCase.execute(productId);

        // Assert
        expect(result).toBeInstanceOf(Error);
    });

    it("should return null when product by ID is not found", async () => {
        // Arrange
        const mockProductRepository = mock<ProductRepository>();
        const getProductByIdUseCase = new GetProductByIdUseCase(instance(mockProductRepository));

        const productId: ProductId = "789"; // Replace with a valid product ID

        // Mocking the repository method to return null
        when(mockProductRepository.getById(productId)).thenResolve(null);

        // Act
        const result = await getProductByIdUseCase.execute(productId);

        // Assert
        expect(result).toBeNull();
    });
});
