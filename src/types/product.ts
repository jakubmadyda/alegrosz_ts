export interface Product {
    name: string;
    description: string;
    price: number;
    image: string;
    stockCount: number;
    barcode: string;
    category: number;
    subCategory: number;
    id: number;
}

export type ProductWithoutId = Omit<Product, 'id'>;
