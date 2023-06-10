import { createContext } from 'react';
import { ProductCart } from '../types/product';

export const CartContext = createContext<
    [ProductCart[], (products: ProductCart[]) => void]
>([
    [
        {
            id: 1,
            name: 'Macbook Air',
            price: 200,
            quantity: 3,
        },
    ],
    () => {},
]);
