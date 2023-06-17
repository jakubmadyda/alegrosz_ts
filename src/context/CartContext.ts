import { createContext, Dispatch, SetStateAction } from 'react';
import { ProductCart } from '../types/product';
import { LocalStorageValue } from '../types/localStorage';

export const CartContext = createContext<
    [
        LocalStorageValue<ProductCart[]>,
        Dispatch<SetStateAction<LocalStorageValue<ProductCart[]>>>
    ]
>([
    [
        {
            id: 1,
            name: 'Macbook Air',
            price: 200,
            quantity: 3,
        },
    ],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
]);
