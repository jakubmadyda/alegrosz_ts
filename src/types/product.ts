import { Category, CategoryApi, Kind } from './category';

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

export interface ProductWithCart extends ProductWithCategories {
    isInCart?: boolean;
}

export interface ProductWithCategoriesAndSubcategories
    extends Omit<ProductWithCategories, 'category'> {
    category: Category | undefined;
}

export interface ProductCart {
    id: number;
    name: string;
    quantity: number;
    price: number;
}
