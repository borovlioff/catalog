import { ProductEntities } from "../core/entities";
import { CatalogRepository  } from "../core/repositories";

export class InMemoryCatalogRepository implements CatalogRepository.CatalogRepository {
    private _products: ProductEntities.Product[] = [];

    async getByName(name: string): Promise<ProductEntities.Product[]> {
        return this._products.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()));
    }

    async getDescription(text: string): Promise<ProductEntities.Product[]> {
        return this._products.filter((product) => product.description.toLowerCase().includes(text.toLowerCase()));
    }

    async getByPrice(priceFilter: CatalogRepository.PriceFilter): Promise<ProductEntities.Product[]> {
        return this._products.filter((product) => {
            if (priceFilter.priceMin !== undefined && product.price < priceFilter.priceMin) {
                return false;
            }
            if (priceFilter.priceMax !== undefined && product.price > priceFilter.priceMax) {
                return false;
            }
            return true;
        });
    }

    async getBySKU(sku: string): Promise<ProductEntities.Product[]> {
        return this._products.filter((product) => product.sku.toLowerCase() === sku.toLowerCase());
    }

    async getByOnSale(): Promise<ProductEntities.Product[]> {
        return this._products.filter((product) => product.onsale);
    }

    async get(productFilter: CatalogRepository.ProductFilter): Promise<ProductEntities.Product[]> {

        let filteredProducts = this._products;

        if (productFilter.name) {
            filteredProducts = filteredProducts.filter((product) =>
                product.name.toLowerCase().includes(productFilter.name!.toLowerCase())
            );
        }

        if (productFilter.description) {
            filteredProducts = filteredProducts.filter((product) =>
                product.description.toLowerCase().includes(productFilter.description!.toLowerCase())
            );
        }

        if (productFilter.sku) {
            filteredProducts = filteredProducts.filter(
                (product) => product.sku.toLowerCase() === productFilter.sku!.toLowerCase()
            );
        }

        if (productFilter.priceMin !== undefined) {
            filteredProducts = filteredProducts.filter((product) => product.price >= productFilter.priceMin!);
        }

        if (productFilter.priceMax !== undefined) {
            filteredProducts = filteredProducts.filter((product) => product.price <= productFilter.priceMax!);
        }

        if (productFilter.onSale !== undefined) {
            filteredProducts = filteredProducts.filter((product) => product.onsale === productFilter.onSale);
        }

        return filteredProducts;
    }
}