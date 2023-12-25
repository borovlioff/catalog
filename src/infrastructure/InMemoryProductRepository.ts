import { ProductEntities  } from "../core/entities";
import { ProductRepository } from "../core/repositories";



export class InMemoryProductRepository implements ProductRepository.ProductRepository {
    private products: ProductEntities.Product[] = [];

    async getById(id: ProductEntities.ProductId): Promise<ProductEntities.Product | null> {
        return this.products.find((product) => product.id === id) || null;
    }

    async getAll(): Promise<ProductEntities.Product[]> {
        return this.products;
    }

    async add(productData: ProductEntities.ICreatProduct): Promise<ProductEntities.Product> {
        const product = new ProductEntities.Product(
            { 
                id:new Date().getTime().toString(),
                ...productData
            }
        );
        this.products.push(product);
        return product;
    }

    async update(id: ProductEntities.ProductId, data: ProductEntities.ICreatProduct): Promise<ProductEntities.Product> {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            const updatedProduct = { ...this.products[productIndex], ...data };
            this.products[productIndex] = updatedProduct;
            return updatedProduct;
        }
        return null;
    }

    async delete(id: ProductEntities.ProductId): Promise<boolean> {
        const initialLength = this.products.length;
        this.products = this.products.filter((product) => product.id !== id);
        return this.products.length !== initialLength;
    }
}
