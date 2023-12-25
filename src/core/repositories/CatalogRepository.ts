import { ProductEntities } from "../entities";

export interface CatalogRepository {
    getByName(name:string): Promise<ProductEntities.Product[]>;
    getDescription(text:string): Promise<ProductEntities.Product[]>;
    getByPrice(priceFilter:PriceFilter):Promise<ProductEntities.Product[]>;
    getBySKU(sku:string):Promise<ProductEntities.Product[]>;
    getByOnSale():Promise<ProductEntities.Product[]>;
    get(productFilter:PriceFilter):Promise<ProductEntities.Product[]>
}

export interface PriceFilter {
    priceMin?: number;
    priceMax?: number;
}


export interface ProductFilter {
    name?: string;
    description?: string;
    sku?: string;
    priceMin?: number;
    priceMax?: number;
    onSale?: boolean;
}
