import { PropsWithChildren, useState } from 'react';
import { ProductCart } from '../../types/product';
import { CartContext } from '../../context/CartContext';

function CartProvider({ children }: PropsWithChildren) {
    const cart = useState<ProductCart[]>([]);

    return (
        <>
            <CartContext.Provider value={cart}>{children}</CartContext.Provider>
        </>
    );
}

export default CartProvider;
