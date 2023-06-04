import { CategoryApi, Kind } from './category';

export interface Product {
    name: string;
    description: string;
    price: number;
    image: string;
    stockCount: number;
    barcode: string;
    category: number;
    subcategory: number;
    id: number;
}

export type ProductWithoutId = Omit<Product, 'id'>;

export interface ProductWithCategories
    extends Omit<Product, 'category' | 'subcategory'> {
    category: CategoryApi | undefined;
    subcategory: Kind | undefined;
}
