import { DeleteProductUseCase } from "../DeleteProduct";
import { Product, ICreatProduct, ProductId } from "../../entities/Product";
import { ProductRepository } from "../../repositories/ProductRepository";
import { instance, mock, when, anything } from "ts-mockito";

describe("DeleteProductUseCase", () => {
    it("should delete product successfully", async () => {
        // Arrange
        const mockProductRepository = mock<ProductRepository>();
        const deleteProductUseCase = new DeleteProductUseCase(instance(mockProductRepository));

        const productId: ProductId = "123"; // Replace with a valid product ID

        // Mocking the repository method
        when(mockProductRepository.delete(anything())).thenResolve(true);

        // Act
        const result = await deleteProductUseCase.execute(productId);

        // Assert
        expect(result).toEqual(true);
    });

    it("should handle error when deleting product fails", async () => {
        // Arrange
        const mockProductRepository = mock<ProductRepository>();
        const deleteProductUseCase = new DeleteProductUseCase(instance(mockProductRepository));

        const productId: ProductId = "456"; // Replace with a valid product ID

        const error: Error = new Error("Failed to delete the product.");

        // Mocking the repository method to throw an error
        when(mockProductRepository.delete(anything())).thenReject(error);

        // Act
        const result = await deleteProductUseCase.execute(productId);

        // Assert
        expect(result).toBeInstanceOf(Error);
    });
});
