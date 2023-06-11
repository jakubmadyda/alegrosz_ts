import { PropsWithChildren } from 'react';
import { ProductCart } from '../../types/product';
import { CartContext } from '../../context/CartContext';
import useLocalStorage from '../../hooks/useLocalStorage';

function CartProvider({ children }: PropsWithChildren) {
    const cart = useLocalStorage<ProductCart[]>('cart', []);

    return (
        <>
            <CartContext.Provider value={cart}>{children}</CartContext.Provider>
        </>
    );
}

export default CartProvider;
