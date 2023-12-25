import { AddProductUseCase } from "../AddProduct";
import { Product, ICreatProduct } from "../../entities/Product";
import { ProductRepository } from "../../repositories/ProductRepository";
import { anything, instance, mock, when } from "ts-mockito";

describe("AddProductUseCase", () => {
    it("should add product successfully", async () => {
        // Arrange
        const mockProductRepository = mock<ProductRepository>();
        const addProductUseCase = new AddProductUseCase(instance(mockProductRepository));
        const productId = "0";
        const productData: ICreatProduct = {
            name:"Test Product",
            price:10
        };

        const addedProduct: Product = new Product({id:productId,name:"Test Product", price:10});

        // Mocking the repository method
        when(mockProductRepository.add(anything())).thenResolve(addedProduct);

        // Act
        const result = await addProductUseCase.execute(productData) as Product;

        // Assert
        expect(result.id).toEqual(productId); 
        expect(result.name).toEqual(productData.name); 
        expect(result.price).toEqual(productData.price); 
    });

    it("should handle error when adding product fails", async () => {
            // Arrange
        const mockProductRepository = mock<ProductRepository>();
        const addProductUseCase = new AddProductUseCase(instance(mockProductRepository));

        const productData: ICreatProduct = {
            name: "Test Product Error",
            price: 0
        };

        const error: Error = new Error("Failed to add the product.");

        // Mocking the repository method to throw an error
        when(mockProductRepository.add(anything())).thenReject(error);

        // Act
        const result = await addProductUseCase.execute(productData);

        // Assert
        expect(result).toBeInstanceOf(Error);
        });
});
