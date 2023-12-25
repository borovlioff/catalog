export type ProductId = string;


export interface IProduct{
    id: ProductId;
    name:string;
    description?:string;
    sku?:string;
    price?:number;
    onsale?:boolean;
    images?:any;
    attributes?:any;
    categories?:any;
}

export class Product {
    public readonly  id: ProductId;
    public readonly  name:string;
    public readonly  description?:string;
    public readonly  sku?:string;
    public readonly  price?:number;
    public readonly  onsale?:boolean;
    public readonly  images?:any;
    public readonly  attributes?:any;
    public readonly  categories?:any;

    constructor(
        product:IProduct
    ) { 
        this.id = product.id;
        this.name = product.name;
        this.description = product.description || null;
        this.sku = product.sku || null;
        this.price = product.price || null;
        this.onsale = product.onsale || null;
        this.images = product.attributes || null;
        this.categories = product.categories || null;
    }
}

export interface ICreatProduct{
    name:string,
    description?:string,
    sku?:string,
    price?:number,
    onsale?:boolean,
    images?:any,
    attributes?:any,
    categories?:any
}

export function CreatProduct({
    name,
    description,
    sku,
    price,
    onsale,
    images,
    attributes,
    categories
}:ICreatProduct){
    
}
