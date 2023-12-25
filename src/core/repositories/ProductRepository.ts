import { Product, ICreatProduct, ProductId } from "../entities/Product";

export interface ProductRepository {
    add(product:ICreatProduct):Promise<Product|Error>;
    update(id: ProductId, data: ICreatProduct):Promise<Product|Error>;
    delete(id: string): Promise<boolean|Error>;
    getAll(): Promise<Product[]|Error>;
    getById(id: string): Promise<Product|null|Error>;
  }