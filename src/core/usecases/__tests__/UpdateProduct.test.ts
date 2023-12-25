import { UpdateProductUseCase } from "../UpdateProduct";
import { Product, ICreatProduct, ProductId } from "../../entities/Product";
import { ProductRepository } from "../../repositories/ProductRepository";
import { instance, mock, when } from "ts-mockito";

describe("UpdateProductUseCase", () => {
    it("should update product successfully", async () => {
        // Arrange
        const mockProductRepository = mock<ProductRepository>();
        const updateProductUseCase = new UpdateProductUseCase(instance(mockProductRepository));
    
        const productId: ProductId = "123"; // Замените на действительный идентификатор продукта
        const updatedData: ICreatProduct = {
            name: "Updated Product",
            price: 15,
        };
    
        const mockUpdatedProduct: Product = new Product({
            id: productId,
            name: "Updated Product",
            price: 15
        });
    
        // Mocking the repository method
        when(mockProductRepository.update(productId, updatedData)).thenResolve(mockUpdatedProduct);
    
        // Act
        const result = await updateProductUseCase.execute(productId, updatedData) as Product;
    
        // Assert
        expect(result.id).toEqual(mockUpdatedProduct.id); // Добавлено сравнение идентификатора
        expect(result.name).toEqual(updatedData.name); // Проверка, что имя обновлено
        expect(result.price).toEqual(updatedData.price); // Проверка, что цена обновлена
    });
    

    it("should handle error when updating product fails", async () => {
        // Arrange
        const mockProductRepository = mock<ProductRepository>();
        const updateProductUseCase = new UpdateProductUseCase(instance(mockProductRepository));

        const productId: ProductId = "456"; // Replace with a valid product ID
        const updatedData: ICreatProduct = {
            name: "Updated Product Error",
            price: 0,
        };

        const error: Error = new Error("Failed to update the product.");

        // Mocking the repository method to throw an error
        when(mockProductRepository.update(productId, updatedData)).thenReject(error);

        // Act
        const result = await updateProductUseCase.execute(productId, updatedData);

        // Assert
        expect(result).toBeInstanceOf(Error);
    });

    it("should handle error when product is not found for update", async () => {
        // Arrange
        const mockProductRepository = mock<ProductRepository>();
        const updateProductUseCase = new UpdateProductUseCase(instance(mockProductRepository));

        const productId: ProductId = "789"; // Replace with a valid product ID
        const updatedData: ICreatProduct = {
            name: "Updated Product Not Found",
            price: 25,
        };

        // Mocking the repository method to return null (product not found)
        when(mockProductRepository.update(productId, updatedData)).thenResolve(null);

        // Act
        const result = await updateProductUseCase.execute(productId, updatedData);

        // Assert
        expect(result).toBeInstanceOf(Error);
        // Optionally, you can check the error message to ensure it's the correct message for product not found
    });
});
